import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { FileLoggerService } from 'src/common/services';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    config: ConfigService,
    private readonly logger: FileLoggerService,
  ) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });

    const currentDate = new Date()
      .toISOString()
      .split('T')[0];

    const directoryPath =
      this.logger.createLogDirectory(
        'db-transactions/' + currentDate,
      );

    this.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();

      if (config.get('DB_LOGGING') === 'true') {
        this.logger.log(
          `Query ${params.model}.${
            params.action
          } took ${after - before}ms`,
          directoryPath,
          'mysql-transactions.log',
        );
      }
      return result;
    });
  }

  async onModuleInit() {
    console.log('Prisma initialize');
    await this.$connect();
  }

  async onModuleDestroy() {
    console.log('Prisma destroy');
    await this.$disconnect();
  }
}
