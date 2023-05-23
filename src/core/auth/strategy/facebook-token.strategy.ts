// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-facebook';
// import { Injectable } from '@nestjs/common';
// import { AuthService } from '../services';

// @Injectable()
// export class FacebookStrategy extends PassportStrategy(
//   Strategy,
//   'facebook',
// ) {
//   constructor(
//     private readonly authService: AuthService,
//   ) {
//     super({
//       clientID: 'your_facebook_app_id',
//       clientSecret: 'your_facebook_app_secret',
//       callbackURL: '/auth/facebook/callback',
//       profileFields: ['id', 'email', 'name'],
//     });
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//   ) {
//     // Find or create the user based on the profile data received from Facebook
//     const user =
//       await this.authService.findOrCreateUserFromFacebook(
//         profile,
//       );
//     return user;
//   }
// }
