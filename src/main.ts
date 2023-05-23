import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes';
import { MyExceptionFilter } from './common/filters';
import { RequestTrackingInterceptor } from './common/interceptors';
import { FileLoggerService } from './common/services';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const fileLoggerService =
    new FileLoggerService();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MyExceptionFilter());
  app.useGlobalInterceptors(
    new RequestTrackingInterceptor(
      fileLoggerService,
    ),
  );
  await app.listen(5000);
}
bootstrap();
