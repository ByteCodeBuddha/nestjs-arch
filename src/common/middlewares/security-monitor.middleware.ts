import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import {
  Request,
  Response,
  NextFunction,
} from 'express';
import { SecurityLoggerService } from '../services/security-logger.service';

@Injectable()
export class SecurityMonitoringMiddleware
  implements NestMiddleware
{
  constructor(
    private readonly securityLogger: SecurityLoggerService,
  ) {}

  use(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { ip, headers, originalUrl } = req;
    const userAgent = headers['user-agent'];

    // Log the request details
    this.securityLogger.logRequest(
      ip,
      userAgent,
      originalUrl,
    );

    // Implement additional security checks if needed
    // ...

    next();
  }
}
