import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers';
import { AuthService } from './services';
import {
  JwtAccessTokenStrategy,
  JwtRefreshTokenStrategy,
} from './strategy';
import { RequestParamsProvider } from 'src/common/util/utils';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    RequestParamsProvider,
    AuthService,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
  ],
})
export class AuthModule {}
