import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FileLoggerService } from '../services';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RequestTrackingInterceptor
  implements NestInterceptor
{
  constructor(
    private readonly logger: FileLoggerService,
  ) {}

  config = new ConfigService();

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    // Track the request count and status code
    const request = context
      .switchToHttp()
      .getRequest();
    const statusCode = context
      .switchToHttp()
      .getResponse().statusCode;

    // const response = context
    //   .switchToHttp()
    //   .getResponse();

    // Increment the request count in memory or in a persistent storage
    // Log or perform any necessary actions based on the status code

    return next.handle().pipe(
      tap((response) => {
        if (
          this.config.get(
            'REQUEST_RESPONSE_LOGGING',
          ) === 'true'
        ) {
          const currentDate = new Date()
            .toISOString()
            .split('T')[0];

          const directoryPath =
            this.logger.createLogDirectory(
              'request-tracker/' + currentDate,
            );

          const logMessage = `Request: ${JSON.stringify(
            request.body,
          )}
          ' | Response: ${JSON.stringify(
            response,
          )}
          ' | StatusCode: ${statusCode}`;

          this.logger.log(
            logMessage,
            directoryPath,
            'request-tracker.log',
          );
        }
        // Additional processing after the response is sent
      }),
    );
  }
}
