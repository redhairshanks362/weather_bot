interface User {
  id: number;
  googleId: string;
  role: string;
}

const users: User[] = [];
let userIdCounter = 1;

export class UserStore {
  static createUser(user: User) {
    users.push(user);
  }

  static getUserByGoogleID(googleId: string): User | undefined {
    return users.find((user) => user.googleId === googleId);
  }

  static fetchNextUserID(): number {
    return userIdCounter++;
  }
}
