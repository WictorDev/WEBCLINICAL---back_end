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

  async Login(login: any): Promise<any> {
    const { identifier, password, tipo } = login;
    const isCpf = !identifier.includes('@');
    
    // Buscar paciente e usuário
    const paciente = await this.prismaService.patient.findUnique({
      where: isCpf ? { cpf: identifier } : { email: identifier },
      include: { type: true },
    });
    const usuario = await this.prismaService.user.findUnique({
      where: isCpf ? { cpf: identifier } : { email: identifier },
      include: { type: true },
    });

    // Validar senha
    const senhaPacienteOk = paciente && await bcrypt.compare(password, paciente.password);
    const senhaUsuarioOk = usuario && await bcrypt.compare(password, usuario.password);
    
    // Se campo tipo for enviado, autentica apenas aquele perfil
    if (tipo === 'paciente') {
      if (!senhaPacienteOk) throw new UnauthorizedException('Usuário ou senha inválidos');
      return this.gerarTokenPaciente(paciente);
    }
    if (tipo === 'profissional') {
      if (!senhaUsuarioOk) throw new UnauthorizedException('Usuário ou senha inválidos');
      if (!usuario.active) throw new UnauthorizedException('Usuário inativo');
      return this.gerarTokenUsuario(usuario);
    }

    // Nenhum perfil válido
    if (!senhaPacienteOk && !senhaUsuarioOk) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    // Ambos perfis válidos
    if (senhaPacienteOk && senhaUsuarioOk) {
      // Gerar token genérico para multiplos perfis
      const payload = {
        id: isCpf ? identifier : (paciente?.cpf || usuario?.cpf),
        multiplosPerfis: true,
        userType: 'multi'
      };
      const secret = this.configService.get<string>('JWT_SECRET');
      const expiresIn = Number(this.configService.get<string>('JWT_EXPIRES_IN')) || 36000;
      if (!secret) throw new Error('JWT_SECRET não definido no .env');
      const accessToken = jwt.sign(payload, secret, { expiresIn });
      
      // Retorna info de múltiplos perfis com um token válido
      return { 
        multiplosPerfis: true, 
        token: accessToken
      };
    }

    // Apenas paciente
    if (senhaPacienteOk) {
      return this.gerarTokenPaciente(paciente);
    }

    // Apenas profissional
    if (senhaUsuarioOk) {
      if (!usuario.active) throw new UnauthorizedException('Usuário inativo');
      return this.gerarTokenUsuario(usuario);
    }
  }

  private gerarTokenPaciente(paciente: any) {
    const payload = {
      id: paciente.cpf,
      type: paciente.type?.name || 'unknown',
      userType: 'paciente',
    };
    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = 3600;
    if (!secret) throw new Error('JWT_SECRET não definido no .env');
    const accessToken = jwt.sign(payload, secret, { expiresIn });
    return { token: accessToken, tipo: 'paciente', nome: paciente.name };
  }

  private gerarTokenUsuario(usuario: any) {
    const payload = {
      id: usuario.cpf,
      type: usuario.type?.name || 'unknown',
      userType: 'profissional',
    };
    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = 3600;
    if (!secret) throw new Error('JWT_SECRET não definido no .env');
    const accessToken = jwt.sign(payload, secret, { expiresIn });
    return { token: accessToken, tipo: 'profissional', nome: usuario.name };
  }
}