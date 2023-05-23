import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UserSessionDto } from './dto';
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

  @Post('/save-user-session')
  saveUserSession(
    @Body() userSession: UserSessionDto,
  ) {
    return this.userService.saveUserSession(
      userSession,
    );
  }

  @Get('/get-user-session/:id')
  getUserSession(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.getUserSession(id);
  }

  @Delete('/del-user-session/:id')
  deleteUserSession(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.deleteUserSession(id);
  }
}
