import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/core/services/auth.service';
import Login from 'src/domain/entities/login';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() login: Login) {
    return this.authService.Login(login);
  }
}