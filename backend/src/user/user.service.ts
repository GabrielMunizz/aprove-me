import { Injectable } from '@nestjs/common';

export type User = {
  login: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: '1',
      username: 'aprovame',
      password: 'aprovame',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return await this.users.find((user) => user.username === username);
  }
}
