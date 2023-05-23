import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DBResponseService } from 'src/common/services';

@Module({
  controllers: [UserController],
  providers: [UserService, DBResponseService],
})
export class UserModule {}
