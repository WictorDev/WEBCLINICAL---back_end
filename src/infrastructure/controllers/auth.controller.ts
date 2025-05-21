import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from 'src/core/services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/infrastructure/auth/public.decorator';
import { Response } from 'express';

@ApiTags('auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginData: { identifier: string; password: string }, @Res() res: Response) {
    try {
      const result = await this.authService.login(loginData);

      if (result.token) {
        res.cookie('token', result.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60 * 10 // 10 horas
        });
        return res.json({ tipo: result.tipo, nome: result.nome });
      }
      return res.json(result);
    } catch (error) {
      return res.status(401).json({
        message: 'Usuário ou senha inválidos',
        error: 'Unauthorized',
        statusCode: 401
      });
    }
  }

  @Public()
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('token');
    return res.json({ message: 'Logout realizado com sucesso!' });
  }
}