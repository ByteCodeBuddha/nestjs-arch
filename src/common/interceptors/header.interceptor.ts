import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor
  implements NestInterceptor
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const response = context
      .switchToHttp()
      .getResponse();

    // Add headers to the response
    response.header('Custom-Header', 'Value');

    return next.handle();
  }
}
