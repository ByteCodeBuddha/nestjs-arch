import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import {
  Request,
  Response,
  NextFunction,
} from 'express';
import { RequestParamsProvider } from '../util/utils';

@Injectable()
export class RequestMiddleware
  implements NestMiddleware
{
  constructor(
    private readonly requestParamsProvider: RequestParamsProvider,
  ) {}

  use(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { ip, headers } = req;
    const userAgent = headers['user-agent'];
    console.log({ ip, userAgent });
    this.requestParamsProvider.setIP(ip);
    this.requestParamsProvider.setUserAgent(
      userAgent,
    );

    next();
  }
}
