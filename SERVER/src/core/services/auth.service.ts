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

    console.log('AuthService - Tentando login com:', identifier);
    // Buscar usuário
    const usuario = await this.prismaService.user.findUnique({
      where: isCpf ? { cpf: identifier } : { email: identifier },
      include: { types: { include: { type: true } } },
    });

    console.log('AuthService - Usuário encontrado:', usuario);

    if (!usuario) {
      console.log('AuthService - Usuário não encontrado!');
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    console.log('AuthService - Senha digitada:', password);
    console.log('AuthService - Hash no banco:', usuario.password);
    const senhaUsuarioOk = await bcrypt.compare(password, usuario.password);
    console.log('AuthService - Resultado bcrypt.compare:', senhaUsuarioOk);

    if (!senhaUsuarioOk) {
      console.log('AuthService - Senha inválida!');
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    // Pega todos os tipos do usuário
    const tipos = usuario.types.map((t: any) => t.type.name);

    const payload = {
      id: usuario.cpf,
      tipos: tipos,
      name: usuario.name,
      companyId: usuario.companyId
    };

    const accessToken = this.jwtService.sign(payload);
    return { 
      token: accessToken, 
      tipos: tipos, 
      nome: usuario.name,
      companyId: usuario.companyId
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