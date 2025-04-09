import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];  // Extrai o token

    if (!token) {
      throw new UnauthorizedException('Token não encontrado');  // Retorna erro se o token não estiver presente
    }

    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      request.user = payload;  // Adiciona o payload à requisição, para uso nas rotas
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');  // Retorna erro se o token for inválido
    }
  }
}
