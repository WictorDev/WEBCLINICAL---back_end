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
    
    // Buscar paciente, usuário e admin
    const paciente = await this.prismaService.patient.findUnique({
      where: isCpf ? { cpf: identifier } : { email: identifier },
      include: { type: true },
    });
    const usuario = await this.prismaService.user.findUnique({
      where: isCpf ? { cpf: identifier } : { email: identifier },
      include: { type: true },
    });
    const admin = await this.prismaService.admin.findUnique({
      where: { Cpf: identifier },
      include: { type: true },
    });
    
    // Verificar se existe registro na tabela Employee usando o mesmo CPF
    const employee = await this.prismaService.employee.findUnique({
      where: { cpf: identifier },
      include: { type: true },
    });

    // Validar senha
    const senhaPacienteOk = paciente && await bcrypt.compare(password, paciente.password);
    const senhaUsuarioOk = usuario && await bcrypt.compare(password, usuario.password);
    
    // Para Admin, devemos usar a senha do usuário correspondente (já que Admin não tem senha própria)
    // Só autenticar Admin se o usuário existe e a senha for correta
    const adminComSenhaValida = admin && usuario && senhaUsuarioOk;
    
    // Verificar se é um funcionário válido (precisa ter registro na tabela Employee e senha correta)
    const funcionarioValido = employee && senhaUsuarioOk;

    // Se campo tipo for enviado, autentica apenas aquele perfil
    if (tipo === 'paciente') {
      if (!senhaPacienteOk) throw new UnauthorizedException('Usuário ou senha inválidos');
      return this.gerarTokenPaciente(paciente);
    }
    if (tipo === 'profissional') {
      if (!senhaUsuarioOk) throw new UnauthorizedException('Usuário ou senha inválidos');
      if (!usuario.active) throw new UnauthorizedException('Usuário inativo');
      if (!employee) throw new UnauthorizedException('Usuário não é um profissional cadastrado');
      return this.gerarTokenUsuario(usuario);
    }
    if (tipo === 'admin') {
      if (!adminComSenhaValida) throw new UnauthorizedException('Usuário ou senha inválidos');
      return this.gerarTokenAdmin(admin);
    }

    // Nenhum perfil válido
    if (!senhaPacienteOk && !senhaUsuarioOk && !adminComSenhaValida) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    // Montar lista de perfis disponíveis
    const perfis: string[] = [];
    if (senhaPacienteOk) perfis.push('paciente');
    // Só adicionar 'profissional' se também existir na tabela Employee
    if (funcionarioValido) perfis.push('profissional');
    if (adminComSenhaValida) perfis.push('admin');

    // Se mais de um perfil, retorna multiplosPerfis
    if (perfis.length > 1) {
      const payload = {
        id: isCpf ? identifier : (paciente?.cpf || usuario?.cpf || admin?.Cpf),
        multiplosPerfis: true,
        userType: 'multi',
        perfisDisponiveis: perfis
      };
      const secret = this.configService.get<string>('JWT_SECRET');
      const expiresIn = Number(this.configService.get<string>('JWT_EXPIRES_IN')) || 36000;
      if (!secret) throw new Error('JWT_SECRET não definido no .env');
      const accessToken = jwt.sign(payload, secret, { expiresIn });
      return {
        multiplosPerfis: true,
        token: accessToken,
        perfisDisponiveis: perfis
      };
    }

    // Apenas paciente
    if (senhaPacienteOk) {
      return this.gerarTokenPaciente(paciente);
    }
    // Apenas profissional
    if (funcionarioValido) {
      if (!usuario.active) throw new UnauthorizedException('Usuário inativo');
      return this.gerarTokenUsuario(usuario);
    }
    // Apenas admin
    if (adminComSenhaValida) {
      return this.gerarTokenAdmin(admin);
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

  private gerarTokenAdmin(admin: any) {
    const payload = {
      id: admin.Cpf,
      type: admin.type?.name || 'unknown',
      userType: 'admin',
    };
    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = 3600;
    if (!secret) throw new Error('JWT_SECRET não definido no .env');
    const accessToken = jwt.sign(payload, secret, { expiresIn });
    return { token: accessToken, tipo: 'admin', nome: admin.name };
  }
}