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
const bcrypt = require("bcrypt");
const prisma_service_1 = require("./prisma.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    prismaService;
    jwtService;
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async login(login) {
        const { identifier, password } = login;
        const isCpf = !identifier.includes('@');
        const usuario = await this.prismaService.user.findUnique({
            where: isCpf ? { cpf: identifier } : { email: identifier },
            include: { types: { include: { type: true } } },
        });
        if (!usuario) {
            throw new common_1.UnauthorizedException('Usuário ou senha inválidos');
        }
        const senhaUsuarioOk = await bcrypt.compare(password, usuario.password);
        if (!senhaUsuarioOk) {
            throw new common_1.UnauthorizedException('Usuário ou senha inválidos');
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
    async validateUser(email, password) {
        const usuario = await this.prismaService.user.findUnique({
            where: { email },
            include: { types: { include: { type: true } } },
        });
        if (!usuario) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const userType = usuario.types[0]?.type.name;
        return {
            cpf: usuario.cpf,
            email: usuario.email,
            name: usuario.name,
            type: userType,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map