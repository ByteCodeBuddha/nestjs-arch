import {
  Injectable,
  NestMiddleware,
  HttpStatus,
} from '@nestjs/common';
import {
  Request,
  Response,
  NextFunction,
} from 'express';

@Injectable()
export class RateLimiterMiddleware
  implements NestMiddleware
{
  private requests: Map<string, number> =
    new Map();
  private readonly MAX_REQUESTS_PER_WINDOW = 100; // Maximum number of requests per window //For test make it as 0 and check
  private readonly WINDOW_SIZE_IN_MINUTES = 1; // Window size in minutes

  use(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const ipAddress = req.ip;

    // Get the current timestamp in minutes
    const currentTimestamp = Math.floor(
      Date.now() / 60000,
    );

    // Get the timestamp of the start of the current window
    const windowStartTimestamp =
      currentTimestamp -
      this.WINDOW_SIZE_IN_MINUTES;

    // Check if the IP address has exceeded the request limit for the current window
    if (
      this.getRequestCount(
        ipAddress,
        windowStartTimestamp,
      ) >= this.MAX_REQUESTS_PER_WINDOW
    ) {
      return res
        .status(HttpStatus.TOO_MANY_REQUESTS)
        .json({
          message:
            'Rate limit exceeded. Please try again later.',
        });
    }

    // Update the request count for the IP address and current timestamp
    this.updateRequestCount(
      ipAddress,
      currentTimestamp,
    );

    next();
  }

  private getRequestCount(
    ipAddress: string,
    timestamp: number,
  ): number {
    const key = `${ipAddress}_${timestamp}`;
    return this.requests.get(key) || 0;
  }

  private updateRequestCount(
    ipAddress: string,
    timestamp: number,
  ) {
    const key = `${ipAddress}_${timestamp}`;
    const requestCount = this.getRequestCount(
      ipAddress,
      timestamp,
    );
    this.requests.set(key, requestCount + 1);
  }
}
