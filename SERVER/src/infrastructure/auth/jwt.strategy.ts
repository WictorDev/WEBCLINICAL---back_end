import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secretKey = configService.get<string>('JWT_SECRET');
    console.log('JWT Strategy inicializada. Secret definida:', !!secretKey);
    
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Função para extrair token do cookie ou do header Authorization
        (req: Request) => {
          // Log de depuração para verificar cabeçalhos
          const hasCookie = !!req.cookies?.auth_token;
          console.log('Cookie auth_token presente:', hasCookie);
          
          // Verificar o header Authorization
          const authHeader = req.headers.authorization;
          const hasAuthHeader = !!authHeader && authHeader.startsWith('Bearer ');
          console.log('Header Authorization presente:', hasAuthHeader);
          
          let token: string | null = null;
          
          // Tentar extrair do cookie primeiro
          if (hasCookie) {
            token = req.cookies.auth_token;
            console.log('Token extraído do cookie auth_token');
          }
          // Se não encontrou no cookie, tentar do header Authorization
          else if (hasAuthHeader) {
            token = authHeader.substring(7); // Remove o prefixo 'Bearer '
            console.log('Token extraído do header Authorization');
          }
          
          console.log('Token encontrado:', token ? 'SIM' : 'NÃO');
          return token;
        }
      ]),
      ignoreExpiration: false, // Garantir que tokens expirados sejam rejeitados
      secretOrKey: secretKey,
    });
  }

  async validate(payload: any) {
    try {
      // Garantir que o payload tem os campos mínimos necessários
      if (!payload || !payload.id) {
        throw new UnauthorizedException('Payload de token inválido');
      }
      
      // Verificar se o token está expirado manualmente
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        throw new UnauthorizedException('Token expirado');
      }
      
      // Log seguro sem expor dados sensíveis
      console.log('JWT validado para usuário:', payload.id, 'tipo:', payload.userType);
      
      // Retorna o payload do token como req.user
      return payload;
    } catch (error) {
      console.error('Erro ao validar JWT payload:', error.message);
      throw new UnauthorizedException('Token inválido');
    }
  }
} 