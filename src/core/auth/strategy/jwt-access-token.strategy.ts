import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { JwtPayload } from '../types';
import { AuthService } from '../services';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>(
        'JWT_ACCESS_TOKEN_SECRET',
      ),
    });
  }

  async validate(payload: JwtPayload) {
    const user =
      await this.authService.getUserSession(
        payload.sub,
      );

    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }

  private getRequestIp(): string {
    // Access the request IP here
    // You can use any method or module to obtain the request IP
    // For example, if you are using Express, you can use:
    // return request.ip;

    // Replace the following line with your actual implementation
    return '::ffff:127.0.0.1';
  }
}
