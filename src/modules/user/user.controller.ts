import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { DataTransformationInterceptor } from 'src/common/interceptors';
import { GetAllUsers } from './interfaces';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('/get-user')
  @UseInterceptors(
    new DataTransformationInterceptor(
      GetAllUsers,
    ),
  )
  getUsers() {
    return this.userService.getUsers();
  }

  @Post('/create-user')
  addUsers(@Body() users: UserDto) {
    return this.userService.createUser(users);
  }
}
