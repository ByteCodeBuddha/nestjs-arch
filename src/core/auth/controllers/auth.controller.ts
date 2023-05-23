import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
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
  signIn(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signUp(dto);
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
  ): Promise<Tokens> {
    return this.authService.refreshTokens(
      userId,
      refreshToken,
    );
  }
}
