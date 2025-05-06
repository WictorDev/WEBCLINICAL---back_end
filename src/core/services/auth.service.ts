import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/core/services/prisma.service';
import { ConfigService } from '@nestjs/config';
import Login from 'src/domain/entities/login';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async Login(login: Login): Promise<{ accessToken: string, userType: string }> {
    const { identifier, password, isPatient } = login;
    
    // Verificar se o identificador é CPF ou email
    const isCpf = !identifier.includes('@');
    
    let user;
    let userType = isPatient ? 'patient' : 'user';
    
    if (isPatient) {
      // Buscar na tabela de pacientes
      if (isCpf) {
        user = await this.prismaService.patient.findUnique({
          where: { cpf: identifier },
          include: { type: true },
        });
      } else {
        user = await this.prismaService.patient.findUnique({
          where: { email: identifier },
          include: { type: true },
        });
      }
    } else {
      // Buscar na tabela de usuários
      if (isCpf) {
        user = await this.prismaService.user.findUnique({
          where: { cpf: identifier },
          include: { type: true },
        });
      } else {
        user = await this.prismaService.user.findUnique({
          where: { email: identifier },
          include: { type: true },
        });
      }
    }

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Senha incorreta');
    }

    // Verificar se o usuário está ativo (apenas para usuários, não pacientes)
    if (!isPatient && !user.active) {
      throw new UnauthorizedException('Usuário inativo');
    }

    const payload = { 
      id: user.cpf,
      type: user.type?.name || 'unknown',
      userType // 'user' ou 'patient'
    };

    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = Number(this.configService.get<string>('JWT_EXPIRES_IN')) || 36000;

    if (!secret) {
      throw new Error('JWT_SECRET não definido no .env');
    }

    const accessToken = jwt.sign(payload, secret, { expiresIn });

    return { 
      accessToken,
      userType
    };
  }
}