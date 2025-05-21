import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/core/services/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async login(login: any): Promise<any> {
    const { identifier, password } = login;
    const isCpf = !identifier.includes('@');

    // Buscar usuário
    const usuario = await this.prismaService.user.findUnique({
      where: isCpf ? { cpf: identifier } : { email: identifier },
      include: { types: { include: { type: true } } },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const senhaUsuarioOk = await bcrypt.compare(password, usuario.password);

    if (!senhaUsuarioOk) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const userType = usuario.types[0]?.type.name;

    const payload = {
      id: usuario.cpf,
      type: userType,
      userType: userType,
      name: usuario.name
    };

    const accessToken = this.jwtService.sign(payload);
    return { 
      token: accessToken, 
      tipo: userType, 
      nome: usuario.name 
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const usuario = await this.prismaService.user.findUnique({
      where: { email },
      include: { types: { include: { type: true } } },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, usuario.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const userType = usuario.types[0]?.type.name;

    return {
      cpf: usuario.cpf,
      email: usuario.email,
      name: usuario.name,
      type: userType,
    };
  }
}