import { Injectable } from '@nestjs/common';
import { FileLoggerService } from './file-logger.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecurityLoggerService {
  constructor(
    private readonly logger: FileLoggerService,
    private config: ConfigService,
  ) {}

  logRequest(
    ipAddress: string,
    userAgent: string | undefined,
    endpoint: string,
  ) {
    // Customize this method to log the security event to your preferred logging system
    if (
      this.config.get('SECURITY_LOGGING') === true
    ) {
      const logMessage = `Security Event: Request from IP ${ipAddress} with User-Agent ${userAgent} to ${endpoint}`;
      const directoryPath =
        this.logger.createLogDirectory(
          'security-events',
        );
      this.logger.log(
        logMessage,
        directoryPath,
        'security-events.log',
      );
    }
  }

  logSuspiciousActivity(
    ipAddress: string,
    message: string,
  ) {
    // Customize this method to log the suspicious activity event to your preferred logging system
    if (
      this.config.get('SECURITY_LOGGING') ===
      'true'
    ) {
      const logMessage = `Suspicious Activity: IP ${ipAddress} - ${message}`;
      const directoryPath =
        this.logger.createLogDirectory(
          'suspicious-activity',
        );
      this.logger.log(
        logMessage,
        directoryPath,
        'suspicious-activity.log',
      );
    }
  }
}
