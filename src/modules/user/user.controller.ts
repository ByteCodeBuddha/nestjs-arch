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
import { RestResponseService } from 'src/common/services';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly restResponse: RestResponseService,
  ) {}

  @Get('/get-user')
  @UseInterceptors(
    new DataTransformationInterceptor(
      GetAllUsers,
    ),
  )
  async getUsers() {
    return this.restResponse.getResponse(
      await this.userService.getUsers(),
    );
  }

  @Post('/create-user')
  addUsers(@Body() users: UserDto) {
    try {
      // Your delete logic using the id goes here
      this.userService.createUser(users);
      return this.restResponse.getSuccessResponse(
        'Successfully deleted',
        null,
      );
    } catch (error) {
      return this.restResponse.getFailureResponse(
        'Failed to delete',
      );
    }
  }
}
