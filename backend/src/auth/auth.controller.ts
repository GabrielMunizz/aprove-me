import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

interface Login {
  login: string;
  password: string;
}

@Controller('integrations/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('auth')
  checkHealth() {
    return { message: 'rota funcionando' };
  }

  @Post('auth')
  login(@Body() body: Login) {
    const { login, password } = body;
    return this.authService.signIn(login, password);
  }
}
