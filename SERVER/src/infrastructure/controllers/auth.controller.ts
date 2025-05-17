import { Controller, Post, Body, Res, Get, Req, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from 'src/core/services/auth.service';
import Login, { LoginProps } from 'src/domain/entities/login';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/infrastructure/auth/public.decorator';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/core/services/prisma.service';

// Opções padronizadas para cookies de autenticação
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' as const : 'lax' as const,
  path: '/',
  maxAge: 24 * 60 * 60 * 1000 // 24 horas
};

@ApiTags('auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService
  ) {}
  
  
  @Public()
  @Post('login')
  async login(@Body() loginProps: LoginProps, @Res() res: Response) {
    try {
      const login = new Login(loginProps);
      if (loginProps.tipo) {
        login.tipo = loginProps.tipo;
      }
      const result = await this.authService.Login(login);
      
      if (result.token) {
        // Configura o cookie HttpOnly (não acessível por JavaScript)
        res.cookie('auth_token', result.token, COOKIE_OPTIONS);
        
        // Não envia o token no corpo da resposta (segurança)
        const responseBody = {
          success: true,
          // Informações não sensíveis que o frontend precisa
          tipo: result.tipo,
          nome: result.nome,
          multiplosPerfis: result.multiplosPerfis,
          // Não incluir o token aqui
        };
        
        // Se for múltiplos perfis, informa ao frontend
        if (result.multiplosPerfis) {
          return res.status(200).json(responseBody);
        }
        
        // Perfil único
        return res.status(200).json(responseBody);
      }
      
      return res.status(400).json({
        success: false,
        message: 'Falha na autenticação'
      });
    } catch (error) {
      return res.status(401).json({ 
        success: false, 
        message: error.message || 'Credenciais inválidas' 
      });
    }
  }

  @Public()
  @Post('login/patient')
  async loginPatient(@Body() loginProps: LoginProps, @Res() res: Response) {
    try {
      const login = new Login({
        ...loginProps,
        isPatient: true
      });
      const result = await this.authService.Login(login);
      
      if (result.token) {
        // Configura o cookie HttpOnly (não acessível por JavaScript)
        res.cookie('auth_token', result.token, COOKIE_OPTIONS);
        
        // Não envia o token no corpo da resposta (segurança)
        return res.status(200).json({
          success: true,
          tipo: result.tipo,
          nome: result.nome
        });
      }
      
      return res.status(400).json({
        success: false,
        message: 'Falha na autenticação'
      });
    } catch (error) {
      console.error('Erro no login de paciente:', error);
      return res.status(401).json({ 
        success: false, 
        message: error.message || 'Credenciais inválidas' 
      });
    }
  }

  @Public()
  @Post('logout')
  async logout(@Res() res: Response) {
    try {
      // Remove o cookie auth_token
      res.clearCookie('auth_token', COOKIE_OPTIONS);
      
      return res.status(200).json({
        success: true,
        message: 'Logout realizado com sucesso'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao realizar logout'
      });
    }
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Req() req) {
    // req.user é preenchido pelo AuthGuard após validação do token JWT
    const userPayload = req.user;
    
    // Se for múltiplos perfis, retorna somente o payload
    if (userPayload.multiplosPerfis === true) {
      return {
        success: true,
        ...userPayload
      };
    }

    // Busca dados adicionais do usuário com base no tipo
    try {
      if (userPayload.userType === 'paciente') {
        const paciente = await this.prismaService.patient.findUnique({
          where: { cpf: userPayload.id },
          select: {
            name: true,
            email: true,
            cpf: true,
            type: {
              select: {
                id: true,
                name: true
              }
            }
          }
        });
        
        if (!paciente) {
          return {
            success: false, 
            message: 'Paciente não encontrado'
          };
        }
        
        return { 
          success: true,
          ...userPayload, 
          userData: paciente, 
          nome: paciente.name 
        };
      } else if (userPayload.userType === 'profissional') {
        const profissional = await this.prismaService.user.findUnique({
          where: { cpf: userPayload.id },
          select: {
            name: true,
            email: true,
            cpf: true,
            type: {
              select: {
                id: true,
                name: true
              }
            }
          }
        });
        
        if (!profissional) {
          return {
            success: false, 
            message: 'Profissional não encontrado'
          };
        }
        
        return { 
          success: true,
          ...userPayload, 
          userData: profissional, 
          nome: profissional.name 
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao buscar dados do usuário'
      };
    }
    
    // Fallback para o payload JWT básico
    return {
      success: true,
      ...userPayload
    };
  }

  @Public()
  @Get('test-auth')
  async testAuth(@Req() req, @Headers() headers) {
    return {
      cookies: {
        auth_token: req.cookies?.auth_token ? 'PRESENTE' : 'AUSENTE'
      },
      headers: {
        authorization: headers.authorization ? 'PRESENTE' : 'AUSENTE'
      },
      message: 'Endpoint de teste de autenticação'
    };
  }
}