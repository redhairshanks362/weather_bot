import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service'; // Import your AuthService
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: '307170329728-mvqkv1du8tn57f7ici77s1ovcnnbpbdl.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const user = await this.authService.getOrInitializeUser(profile);
    done(null, user);
  }
}
