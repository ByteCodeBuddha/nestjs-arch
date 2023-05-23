import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/database/mysql/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { RedisService } from 'src/core/database/inmemory/redis/redis.service';
import * as argon from 'argon2';
import { AuthDto } from '../dto';
import { JwtPayload } from '../types/jwtPayload.type';
import { Tokens } from '../types/tokens.type';
import { UserAlreadyExists } from 'src/common/exceptions/user-already-exists.exception';
import { UserSessionDto } from 'src/modules/user/dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(dto: AuthDto): Promise<Tokens> {
    const hash = await argon.hash(dto.password);

    let user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (user) {
      throw new UserAlreadyExists(
        'Email already registered',
      );
    }
    user = await this.prisma.user
      .create({
        data: {
          email: dto.email,
          password: hash,
        },
      })
      .catch((error) => {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) {
          if (error.code === 'P2002') {
            throw new ForbiddenException(
              'Credential incorrect',
            );
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(user);
    await this.updateRefreshTokenHash(
      user.id,
      tokens.refreshToken,
    );

    let userSession = new UserSessionDto();
    const accessTokenHash = await argon.hash(
      tokens.accessToken,
    );

    userSession = {
      userId: user.id,
      token: accessTokenHash,
    };
    await this.saveUserSession(userSession);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async signIn(dto: AuthDto): Promise<Tokens> {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (!user)
      throw new ForbiddenException(
        'Invalid Credentials',
      );

    const passwordMatches = await argon.verify(
      user.password,
      dto.password,
    );
    if (!passwordMatches)
      throw new ForbiddenException(
        'Invalid Credentials',
      );

    const tokens = await this.getTokens(user);
    await this.updateRefreshTokenHash(
      user.id,
      tokens.refreshToken,
    );

    let userSession = new UserSessionDto();
    const accessTokenHash = await argon.hash(
      tokens.accessToken,
    );

    userSession = {
      userId: user.id,
      token: accessTokenHash,
    };
    await this.saveUserSession(userSession);
    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  findOrCreateUserFromFacebook(profile: any) {
    console.log(profile);
    throw new Error('Method not implemented.');
  }
  findOrCreateUserFromGoogle(profile: any) {
    console.log(profile);
    throw new Error('Method not implemented.');
  }

  async validateUserById(
    userId: number,
    accessToken: string,
  ) {
    const user = await this.getUserSession(
      userId,
    );

    if (user) {
      const match = await argon.verify(
        user.token,
        accessToken,
      );

      if (!match)
        throw new ForbiddenException(
          'Access Denied',
        );
    }

    return user;
  }

  async logout(userId: number): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });
    await this.deleteUserSession(userId);
    return true;
  }

  async refreshTokens(
    userId: number,
    rt: string,
  ): Promise<Tokens> {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    if (!user || !user.refreshToken)
      throw new ForbiddenException(
        'Access Denied',
      );

    const rtMatches = await argon.verify(
      user.refreshToken,
      rt,
    );
    if (!rtMatches)
      throw new ForbiddenException(
        'Access Denied',
      );

    const tokens = await this.getTokens(user);
    await this.updateRefreshTokenHash(
      user.id,
      tokens.refreshToken,
    );

    let userSession = new UserSessionDto();
    const accessTokenHash = await argon.hash(
      tokens.accessToken,
    );

    userSession = {
      userId: user.id,
      token: accessTokenHash,
    };
    await this.saveUserSession(userSession);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async updateRefreshTokenHash(
    userId: number,
    rt: string,
  ) {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hash,
      },
    });
  }

  async getTokens(user: any) {
    const jwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };
    const [accessToken, refreshToken] =
      await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
          secret: this.configService.get(
            'JWT_ACCESS_TOKEN_SECRET',
          ),
          expiresIn: '10m',
        }),

        this.jwtService.signAsync(jwtPayload, {
          secret: this.configService.get(
            'JWT_REFRESH_TOKEN_SECRET',
          ),
          expiresIn: '1d',
        }),
      ]);

    return { accessToken, refreshToken };
  }

  async saveUserSession(dto: UserSessionDto) {
    const key = `user:${dto.userId}`;
    const value = JSON.stringify({ ...dto });
    const redisClient =
      this.redis.getRedisClient();
    try {
      await redisClient.set(key, value);
      // console.log(
      //   `User details stored in Redis: - User ID ${dto.userId},Token - ${dto.token} `,
      // );
    } catch (error) {
      // console.log(
      //   `Failed to store user session in Redis: User ID - ${dto.userId}, Error - ${error}`,
      // );
      throw error;
    }
  }

  async getUserSession(
    userId: number,
  ): Promise<UserSessionDto | null> {
    const key = `user:${userId}`;

    const redisClient =
      this.redis.getRedisClient();

    try {
      const value = await redisClient.get(key);
      if (value) {
        const { token } = JSON.parse(value);
        const userSession: UserSessionDto = {
          token: token,
          userId: userId,
        };
        return userSession;
      }
      return null;
    } catch (error) {
      console.error(
        `Failed to retrieve user details from Redis: User ID - ${userId}, Error - ${error}`,
      );
      throw error;
    }
  }

  async deleteUserSession(
    userId: number,
  ): Promise<void> {
    const key = `user:${userId}`;

    const redisClient =
      this.redis.getRedisClient();

    try {
      await redisClient.del(key);
      console.log(
        `User details deleted from Redis: User ID - ${userId}`,
      );
    } catch (error) {
      console.error(
        `Failed to delete user details from Redis: User ID - ${userId}, Error - ${error}`,
      );
      throw error;
    }
  }
}
