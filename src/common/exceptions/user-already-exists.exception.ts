import {
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export class UserAlreadyExists extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
