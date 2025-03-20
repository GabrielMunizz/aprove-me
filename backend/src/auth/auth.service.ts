import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(login);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: login };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1m',
    });

    return { accessToken };
  }
}
