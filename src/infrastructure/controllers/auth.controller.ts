import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/core/services/auth.service';
import Login, { LoginProps } from 'src/domain/entities/login';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginProps: LoginProps) {
    const login = new Login(loginProps);
    return this.authService.Login(login);
  }

  @Post('login/patient')
  async loginPatient(@Body() loginProps: LoginProps) {
    const login = new Login({
      ...loginProps,
      isPatient: true
    });
    return this.authService.Login(login);
  }
}