import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
}

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    let statusCode = context
      .switchToHttp()
      .getResponse().statusCode;
    const message = 'Success';

    if (!statusCode) {
      statusCode = 200;
    }

    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message,
        data,
      })),
    );
  }
}
