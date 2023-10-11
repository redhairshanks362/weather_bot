interface User {
  id: number;
  googleId: string;
  role: string;
}

const users: User[] = [];

export class UserStore {
  static addUser(user: User) {
    users.push(user);
  }

  static findUserByGoogleId(googleId: string): User | undefined {
    return users.find((user) => user.googleId === googleId);
  }
}
