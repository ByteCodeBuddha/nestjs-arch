import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { FileLoggerService } from 'src/common/services';

@Global()
@Module({
  providers: [PrismaService, FileLoggerService],
  exports: [PrismaService],
})
export class PrismaModule {}
