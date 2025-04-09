import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/core/services/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import Login from 'src/domain/entities/login';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: Login): Promise<{ accessToken: string }> {
    const { cpf, password } = data;

    const user = await this.prismaService.user.findUnique({
      where: { cpf },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = { sub: user.cpf.toString() }; // 'sub' é padrão JWT

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '1h',
    });

    return { accessToken };
  }
}
