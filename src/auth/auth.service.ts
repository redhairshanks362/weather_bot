// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { UserStore } from '../user/user-store'; // Corrected path

@Injectable()
export class AuthService {
  async getOrInitializeUser(profile: any): Promise<any> {
    const existingUser = UserStore.getUserByGoogleID(profile.id);

    if (existingUser) {
      return existingUser;
    }

    const newUser = {
      id: UserStore.fetchNextUserID(),
      googleId: profile.id,
      role: 'user',
    };

    UserStore.createUser(newUser);
    return newUser;
  }
}
