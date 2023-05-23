import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationException } from '../exceptions';

@Injectable()
export class ValidationPipe
  implements PipeTransform<any>
{
  async transform(
    value: any,
    metadata: ArgumentMetadata,
  ): Promise<any> {
    const { metatype } = metadata;

    if (!metatype || !this.isDto(metatype)) {
      return value;
    }

    const dto = plainToClass(metatype, value);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages =
        this.formatErrorMessages(errors);
      throw new ValidationException(
        errorMessages,
      );
    }

    return value;
  }

  private isDto(metatype: any): boolean {
    const types = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];
    return !types.includes(metatype);
  }

  private formatErrorMessages(
    errors: any[],
  ): { field: string; error: string }[] {
    return errors.map((error) => {
      const constraints = Object.values(
        error.constraints,
      );
      const field = error.property;
      return {
        field,
        error: constraints.join(', '),
      };
    });
  }
}
