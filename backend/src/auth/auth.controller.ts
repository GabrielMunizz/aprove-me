import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface Login {
  login: string;
  password: string;
}

@Controller('integrations')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth')
  login(@Body() body: Login) {
    const { login, password } = body;
    return this.authService.login(login, password);
  }
}
