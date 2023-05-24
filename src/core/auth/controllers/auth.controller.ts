import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../services';
import { AuthDto } from '../dto';
import { Tokens } from '../types/tokens.type';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { JwtRefreshGuard } from '../guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signIn(
    @Body() dto: AuthDto,
    @Req() request: Request,
  ): Promise<Tokens> {
    const { ip, headers } = request;
    const userAgent = headers['user-agent'];
    return this.authService.signIn(
      dto,
      ip,
      userAgent,
    );
  }

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(
    @Body() dto: AuthDto,
    @Req() request: Request,
  ): Promise<Tokens> {
    const { ip, headers } = request;
    const userAgent = headers['user-agent'];
    return this.authService.signUp(
      dto,
      ip,
      userAgent,
    );
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @GetCurrentUserId() userId: number,
  ): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken')
    refreshToken: string,
    @Req() request: Request,
  ): Promise<Tokens> {
    const { ip, headers } = request;
    const userAgent = headers['user-agent'];
    return this.authService.refreshTokens(
      userId,
      refreshToken,
      ip,
      userAgent,
    );
  }
}
