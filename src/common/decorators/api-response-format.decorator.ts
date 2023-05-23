import { SetMetadata } from '@nestjs/common';

export const ApiResponseFormat = (
  statusCode: number,
  message: string,
) =>
  SetMetadata('apiResponseFormat', {
    statusCode,
    message,
  });
