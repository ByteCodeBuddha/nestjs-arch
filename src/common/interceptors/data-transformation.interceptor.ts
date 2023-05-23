import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

@Injectable()
export class DataTransformationInterceptor
  implements NestInterceptor
{
  constructor(private readonly dtoType: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) =>
            plainToClass(this.dtoType, item, {
              excludeExtraneousValues: true,
            }),
          );
        } else {
          return plainToClass(
            this.dtoType,
            data,
            {
              excludeExtraneousValues: true,
            },
          );
        }
      }),
    );
  }
}
