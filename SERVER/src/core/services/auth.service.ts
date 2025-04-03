import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/core/services/prisma.service';
import { ConfigService } from '@nestjs/config';
import Login from 'src/domain/entities/login';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async Login(Login: Login): Promise<{ accessToken: string }> {
    const { cpf, password } = Login;

    const user = await this.prismaService.user.findUnique({
      where: { cpf },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new Error('Senha incorreta');
    }

    const payload = { id: user.id };

    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = Number(this.configService.get<string>('JWT_EXPIRES_IN')) || 36000;



    if (!secret) {
      throw new Error('JWT_SECRET não definido no .env');
    }

    const accessToken = jwt.sign(payload, secret, { expiresIn });

    return { accessToken };
  }
}