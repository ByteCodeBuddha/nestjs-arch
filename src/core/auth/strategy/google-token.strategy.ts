import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  'google',
) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      clientID: 'your_google_client_id',
      clientSecret: 'your_google_client_secret',
      callbackURL: '/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    // Find or create the user based on the profile data received from Google
    const user =
      await this.authService.findOrCreateUserFromGoogle(
        profile,
      );
    return user;
  }
}
