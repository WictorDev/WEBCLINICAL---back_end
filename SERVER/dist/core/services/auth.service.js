"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma_service_1 = require("./prisma.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    prismaService;
    configService;
    jwtService;
    constructor(prismaService, configService, jwtService) {
        this.prismaService = prismaService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async Login(login) {
        const { identifier, password, tipo } = login;
        const isCpf = !identifier.includes('@');
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
        const employee = await this.prismaService.employee.findUnique({
            where: { cpf: identifier },
            include: { type: true },
        });
        const senhaPacienteOk = paciente && await bcrypt.compare(password, paciente.password);
        const senhaUsuarioOk = usuario && await bcrypt.compare(password, usuario.password);
        const adminComSenhaValida = admin && usuario && senhaUsuarioOk;
        const funcionarioValido = employee && senhaUsuarioOk;
        if (tipo === 'paciente') {
            if (!senhaPacienteOk)
                throw new common_1.UnauthorizedException('Usuário ou senha inválidos');
            return this.gerarTokenPaciente(paciente);
        }
        if (tipo === 'profissional') {
            if (!senhaUsuarioOk)
                throw new common_1.UnauthorizedException('Usuário ou senha inválidos');
            if (!usuario.active)
                throw new common_1.UnauthorizedException('Usuário inativo');
            if (!employee)
                throw new common_1.UnauthorizedException('Usuário não é um profissional cadastrado');
            return this.gerarTokenUsuario(usuario);
        }
        if (tipo === 'admin') {
            if (!adminComSenhaValida)
                throw new common_1.UnauthorizedException('Usuário ou senha inválidos');
            return this.gerarTokenAdmin(admin);
        }
        if (!senhaPacienteOk && !senhaUsuarioOk && !adminComSenhaValida) {
            throw new common_1.UnauthorizedException('Usuário ou senha inválidos');
        }
        const perfis = [];
        if (senhaPacienteOk)
            perfis.push('paciente');
        if (funcionarioValido)
            perfis.push('profissional');
        if (adminComSenhaValida)
            perfis.push('admin');
        if (perfis.length > 1) {
            const payload = {
                id: isCpf ? identifier : (paciente?.cpf || usuario?.cpf || admin?.Cpf),
                multiplosPerfis: true,
                userType: 'multi',
                perfisDisponiveis: perfis
            };
            const secret = this.configService.get('JWT_SECRET');
            const expiresIn = Number(this.configService.get('JWT_EXPIRES_IN')) || 36000;
            if (!secret)
                throw new Error('JWT_SECRET não definido no .env');
            const accessToken = jwt.sign(payload, secret, { expiresIn });
            return {
                multiplosPerfis: true,
                token: accessToken,
                perfisDisponiveis: perfis
            };
        }
        if (senhaPacienteOk) {
            return this.gerarTokenPaciente(paciente);
        }
        if (funcionarioValido) {
            if (!usuario.active)
                throw new common_1.UnauthorizedException('Usuário inativo');
            return this.gerarTokenUsuario(usuario);
        }
        if (adminComSenhaValida) {
            return this.gerarTokenAdmin(admin);
        }
    }
    gerarTokenPaciente(paciente) {
        const payload = {
            id: paciente.cpf,
            type: paciente.type?.name || 'unknown',
            userType: 'paciente',
        };
        const secret = this.configService.get('JWT_SECRET');
        const expiresIn = 3600;
        if (!secret)
            throw new Error('JWT_SECRET não definido no .env');
        const accessToken = jwt.sign(payload, secret, { expiresIn });
        return { token: accessToken, tipo: 'paciente', nome: paciente.name };
    }
    gerarTokenUsuario(usuario) {
        const payload = {
            id: usuario.cpf,
            type: usuario.type?.name || 'unknown',
            userType: 'profissional',
        };
        const secret = this.configService.get('JWT_SECRET');
        const expiresIn = 3600;
        if (!secret)
            throw new Error('JWT_SECRET não definido no .env');
        const accessToken = jwt.sign(payload, secret, { expiresIn });
        return { token: accessToken, tipo: 'profissional', nome: usuario.name };
    }
    gerarTokenAdmin(admin) {
        const payload = {
            id: admin.Cpf,
            type: admin.type?.name || 'unknown',
            userType: 'admin',
        };
        const secret = this.configService.get('JWT_SECRET');
        const expiresIn = 3600;
        if (!secret)
            throw new Error('JWT_SECRET não definido no .env');
        const accessToken = jwt.sign(payload, secret, { expiresIn });
        return { token: accessToken, tipo: 'admin', nome: admin.name };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map