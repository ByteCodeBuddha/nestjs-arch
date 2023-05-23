import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './core/database/mysql/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import {
  APP_GUARD,
  APP_PIPE,
} from '@nestjs/core';

import { ValidationPipe } from './common/pipes';
import { RedisModule } from './core/database/inmemory/redis/redis.module';
import { AuthModule } from './core/auth/auth.module';
import { JwtAuthGuard } from './core/auth/guards';
import { SecurityLoggerService } from './common/services/security-logger.service';
import { SecurityMonitoringMiddleware } from './common/middlewares';
import { RateLimiterMiddleware } from './common/middlewares';
import { FileLoggerService } from './common/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    FileLoggerService,
    SecurityLoggerService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecurityMonitoringMiddleware)
      .forRoutes('*');
    consumer
      .apply(RateLimiterMiddleware)
      .forRoutes('*');
  }
}
