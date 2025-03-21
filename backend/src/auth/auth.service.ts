import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(login);

    console.log('USER TEST -->', user);

    console.log('RECEIVED PASS -->', password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('VALID?', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: login };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });

    return { accessToken };
  }
}
