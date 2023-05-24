import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes';
import { MyExceptionFilter } from './common/filters';
import {
  HeaderInterceptor,
  RequestTrackingInterceptor,
} from './common/interceptors';
import { FileLoggerService } from './common/services';
import * as cors from 'cors';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable Helmet with recommended security options
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
          ],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: [
            "'self'",
            'data:',
            'cdn.example.com',
          ],
        },
      },
      frameguard: { action: 'deny' },
      hidePoweredBy: true,
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
      },
      referrerPolicy: {
        policy: 'strict-origin-when-cross-origin',
      },
      xXssProtection: true,
    }),
  );

  // Enable CORS
  app.use(
    cors({
      origin: ['*'],
      methods: [
        'GET, PUT, DELETE, OPTIONS, POST, PATCH',
      ],
      allowedHeaders: [
        'Authorization',
        'Content-Type',
      ],
      credentials: false,
      maxAge: 3600, // 1 hour
    }),
  );
  const fileLoggerService =
    new FileLoggerService();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MyExceptionFilter());
  app.useGlobalInterceptors(
    new RequestTrackingInterceptor(
      fileLoggerService,
    ),
  );
  app.useGlobalInterceptors(
    new HeaderInterceptor(),
  );
  await app.listen(5000);
}
bootstrap();
