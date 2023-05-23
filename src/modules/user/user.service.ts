import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/mysql/prisma/prisma.service';
import { RedisService } from 'src/core/database/inmemory/redis/redis.service';
import { UserDto, UserSessionDto } from './dto';
import { DBResponseService } from 'src/common/services';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
    private responseService: DBResponseService,
  ) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async createUser(dto: UserDto) {
    return this.responseService.handleInsertion(
      async () => {
        return this.prisma.user.create({
          data: {
            ...dto,
          },
        });
      },
    );
  }

  async deleteUser(id: number) {
    return await this.responseService.handleDelete(
      async () => {
        return this.prisma.user.delete({
          where: { id },
        });
      },
    );
  }

  async saveUserSession(dto: UserSessionDto) {
    const key = `user:${dto.userId}`;
    const value = JSON.stringify({ ...dto });
    const redisClient =
      this.redis.getRedisClient();
    try {
      await redisClient.set(key, value);
      console.log(
        `User details stored in Redis: - User ID ${dto.userId},Token - ${dto.token} `,
      );
    } catch (error) {
      console.log(
        `Failed to store user session in Redis: User ID - ${dto.userId}, Error - ${error}`,
      );
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
