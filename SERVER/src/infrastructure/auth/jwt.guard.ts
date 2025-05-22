import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Buscar o token no cookie HTTPOnly
    let token = request.cookies?.token;
    console.log('JwtGuard - Token do cookie:', token);
    // Se não encontrar no cookie, buscar no header Authorization
    if (!token) {
      token = request.headers['authorization']?.split(' ')[1];
      console.log('JwtGuard - Token do header Authorization:', token);
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('JwtGuard - isPublic:', isPublic);

    if (isPublic) {
      console.log('JwtGuard - Rota pública, liberando acesso.');
      return true;
    }

    if (!token) {
      console.log('JwtGuard - Token não encontrado!');
      throw new UnauthorizedException('Token não encontrado');
    }

    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      console.log('JwtGuard - Payload decodificado:', payload);
      request.user = payload;
      return true;
    } catch (error) {
      console.log('JwtGuard - Erro ao verificar token:', error);
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
