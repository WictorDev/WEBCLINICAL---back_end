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
    async Login(Login) {
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
        const payload = { cpf: user.cpf };
        const secret = this.configService.get('JWT_SECRET');
        const expiresIn = Number(this.configService.get('JWT_EXPIRES_IN')) || 36000;
        if (!secret) {
            throw new Error('JWT_SECRET não definido no .env');
        }
        const accessToken = jwt.sign(payload, secret, { expiresIn });
        return { accessToken };
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