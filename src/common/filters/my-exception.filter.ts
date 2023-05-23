import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { ValidationException } from '../exceptions';

@Catch()
export class MyExceptionFilter
  implements ExceptionFilter
{
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let statusCode =
      HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage =
      'Something went wrong with the server';

    let errorData = null;

    if (
      exception instanceof ValidationException
    ) {
      statusCode = exception.getStatus();
      const { errors } =
        exception.getResponse() as any;
      errorMessage = 'Validation Error';
      errorData = errors || null;
    } else if (
      process.env.NODE_ENV !== 'production'
    ) {
      if (exception instanceof HttpException) {
        statusCode = exception.getStatus();
        errorMessage = exception.message;
      } else {
        errorData = exception;
      }
    }

    // Handle and customize the error response
    response.status(statusCode).json({
      statusCode,
      message: errorMessage,
      errors: errorData,
    });
  }
}
