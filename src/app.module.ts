import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
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
import {
  RequestMiddleware,
  SecurityMonitoringMiddleware,
} from './common/middlewares';
import { RateLimiterMiddleware } from './common/middlewares';
import { FileLoggerService } from './common/services';
import {
  ThrottlerGuard,
  ThrottlerModule,
} from '@nestjs/throttler';
import { RequestParamsProvider } from './common/util/utils';

@Module({
  providers: [
    RequestParamsProvider,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    FileLoggerService,
    SecurityLoggerService,
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      }),
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    UserModule,
  ],
  exports: [RequestParamsProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestMiddleware)
      .forRoutes('*');
    consumer
      .apply(SecurityMonitoringMiddleware)
      .forRoutes('*');
    consumer
      .apply(RateLimiterMiddleware)
      .forRoutes('*');
    // Add other middleware registrations here
  }
}
