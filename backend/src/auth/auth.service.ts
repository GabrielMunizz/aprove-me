import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(login: string, password: string) {
    if (login !== 'aprovame' || password !== 'aprovame') {
      throw new UnauthorizedException('login ou senha inválidos');
    }
    const payload = { username: login };
    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '1m',
    });

    return { accessToken };
  }
}
