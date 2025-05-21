import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from 'src/core/services/auth.service';
import Login, { LoginProps } from 'src/domain/entities/login';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/infrastructure/auth/public.decorator';
import { Response } from 'express';


@ApiTags('auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  async login(@Body() loginProps: LoginProps, @Res() res: Response) {
    const login = new Login(loginProps);
    if (loginProps.tipo) {
      login.tipo = loginProps.tipo;
    }
    const result = await this.authService.Login(login);

    if (result.token) {
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 10 // 10 horas
      });
      return res.json({ tipo: result.tipo, nome: result.nome, token: result.token });
    }
    // Caso multiplosPerfis
    return res.json(result);
  }

  @Public()
  @Post('login/patient')
  async loginPatient(@Body() loginProps: LoginProps) {
    const login = new Login({
      ...loginProps,
      isPatient: true
    });
    return this.authService.Login(login);
  }

  @Public()
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('token');
    return res.json({ message: 'Logout realizado com sucesso!' });
  }
}