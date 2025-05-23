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

  async login(loginData: { identifier: string; password: string }) {
    console.log('AuthService - Tentando login com:', loginData.identifier);

    // Busca nas duas tabelas
    const [userData, patient] = await Promise.all([
      this.prismaService.user.findUnique({
        where: { cpf: loginData.identifier },
        include: { types: { include: { type: true } } }
      }),
      this.prismaService.patient.findUnique({
        where: { cpf: loginData.identifier },
        include: { type: true }
      })
    ]);

    // Se não encontrou em nenhuma tabela
    if (!userData && !patient) {
      console.log('AuthService - Usuário não encontrado!');
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    let user: any;

    // Se encontrou apenas na tabela Patient
    if (!userData && patient) {
      user = {
        cpf: patient.cpf,
        email: patient.email,
        password: patient.password,
        name: patient.name,
        active: true,
        companyId: null,
        types: [{
          userId: patient.cpf,
          typeId: patient.typeId,
          type: patient.type || { id: patient.typeId, name: 'PATIENT' }
        }]
      };
    }
    // Se encontrou na tabela User e também é Patient
    else if (userData && patient) {
      user = {
        ...userData,
        types: [
          ...userData.types,
          {
            userId: patient.cpf,
            typeId: patient.typeId,
            type: patient.type || { id: patient.typeId, name: 'PATIENT' }
          }
        ]
      };
    } else {
      user = userData;
    }

    console.log('AuthService - Usuário encontrado:', user);

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    console.log('AuthService - Senha digitada:', loginData.password);
    console.log('AuthService - Hash no banco:', user.password);
    console.log('AuthService - Resultado bcrypt.compare:', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const tipos = user.types.map((t: any) => t.type.name);

    const payload = {
      id: user.cpf,
      tipos: tipos,
      name: user.name,
      companyId: user.companyId
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const now = Math.floor(Date.now() / 1000);
    return { 
      token: accessToken, 
      tipos: tipos, 
      nome: user.name,
      iat: now,
      exp: now + 3600,
      companyId: user.companyId
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