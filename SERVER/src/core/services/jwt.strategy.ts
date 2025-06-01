import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secretKey = configService.get<string>('JWT_SECRET');
    if (!secretKey) {
      throw new Error('JWT_SECRET não definido no .env');
    }
    
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Função para extrair token do cookie ou do header Authorization
        (req: Request) => {
          // Tentar extrair do cookie primeiro
          let token: string | null = null;
          
          if (req.cookies?.token) {
            token = req.cookies.token;
          }
          // Se não encontrou no cookie, tentar do header Authorization
          else {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
              token = authHeader.substring(7); // Remove o prefixo 'Bearer '
            }
          }
          
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
      
      // Retorna o payload do token como req.user
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
} 