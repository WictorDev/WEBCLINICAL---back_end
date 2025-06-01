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
    async login(loginData) {
        console.log('AuthService - Tentando login com:', loginData.identifier);
        const [userData, patient] = await Promise.all([
            this.prismaService.user.findFirst({
                where: {
                    OR: [
                        { cpf: loginData.identifier },
                        { email: loginData.identifier }
                    ]
                },
                include: { types: { include: { type: true } } }
            }),
            this.prismaService.patient.findFirst({
                where: {
                    OR: [
                        { cpf: loginData.identifier },
                        { email: loginData.identifier }
                    ]
                },
                include: { type: true }
            })
        ]);
        if (!userData && !patient) {
            console.log('AuthService - Usuário não encontrado!');
            throw new common_1.UnauthorizedException('Usuário ou senha inválidos');
        }
        let user;
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
        }
        else {
            user = userData;
        }
        console.log('AuthService - Usuário encontrado:', user);
        const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
        console.log('AuthService - Senha digitada:', loginData.password);
        console.log('AuthService - Hash no banco:', user.password);
        console.log('AuthService - Resultado bcrypt.compare:', isPasswordValid);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Usuário ou senha inválidos');
        }
        const tipos = user.types.map((t) => t.type.name);
        const payload = {
            cpf: user.cpf,
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
            cpf: user.cpf,
            iat: now,
            exp: now + 3600,
            companyId: user.companyId
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