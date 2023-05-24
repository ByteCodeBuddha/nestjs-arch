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
import { RequestParamsProvider } from 'src/common/util/utils';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
    private readonly requestParamsProvider: RequestParamsProvider,
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
    const requestIP =
      this.requestParamsProvider.getIP();
    const userAgent =
      this.requestParamsProvider.getUserAgent();
    const user =
      await this.authService.getUserSession(
        payload.sub,
      );

    if (!user) {
      throw new UnauthorizedException();
    } else if (
      (this.config.get('SSO') === 'true' &&
        user.ip !== requestIP) ||
      user.userAgent !== userAgent
    ) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
