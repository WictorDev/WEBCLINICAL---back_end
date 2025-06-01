import { Controller, Post, Get, Req, Body, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/core/services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/infrastructure/auth/public.decorator';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt.guard';

@ApiTags('auth')
@Controller('/api/auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginData: { identifier: string; password: string }, @Res() res: Response) {
    try {
      console.log('Controller - Recebendo login:', loginData);
      const result = await this.authService.login(loginData);
      console.log('Controller - Resultado do AuthService:', result);

      if (result.token) {
        res.cookie('token', result.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60 * 10 // 10 horas
        });
        const { token, ...rest } = result;
        console.log('Controller - Cookie setado, resposta:', rest);
        return res.json(rest);
      }
      console.log('Controller - Resultado sem token:', result);
      return res.json(result);
    } catch (error) {
      console.log('Controller - Erro no login:', error);
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

  @Get('me')
  getProfile(@Req() req: any) {
    if (!req.user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    // req.user já é o payload do JWT
    return {
      id: req.user.id,
      tipos: req.user.tipos,
      name: req.user.name,
      iat: req.user.iat,
      exp: req.user.exp,
      companyId: req.user.companyId
    };
  }
}