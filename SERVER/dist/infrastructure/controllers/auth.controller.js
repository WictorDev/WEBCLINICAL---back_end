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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../core/services/auth.service");
const login_1 = require("../../domain/entities/login");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../auth/public.decorator");
const passport_1 = require("@nestjs/passport");
const prisma_service_1 = require("../../core/services/prisma.service");
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    path: '/',
    maxAge: 24 * 60 * 60 * 1000
};
let AuthController = class AuthController {
    authService;
    prismaService;
    constructor(authService, prismaService) {
        this.authService = authService;
        this.prismaService = prismaService;
    }
    async login(loginProps, res) {
        try {
            const login = new login_1.default(loginProps);
            if (loginProps.tipo) {
                login.tipo = loginProps.tipo;
            }
            const result = await this.authService.Login(login);
            if (result.token) {
                res.cookie('auth_token', result.token, COOKIE_OPTIONS);
                const responseBody = {
                    success: true,
                    tipo: result.tipo,
                    nome: result.nome,
                    multiplosPerfis: result.multiplosPerfis,
                };
                if (result.multiplosPerfis) {
                    return res.status(200).json(responseBody);
                }
                return res.status(200).json(responseBody);
            }
            return res.status(400).json({
                success: false,
                message: 'Falha na autenticação'
            });
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message || 'Credenciais inválidas'
            });
        }
    }
    async loginPatient(loginProps, res) {
        try {
            const login = new login_1.default({
                ...loginProps,
                isPatient: true
            });
            const result = await this.authService.Login(login);
            if (result.token) {
                res.cookie('auth_token', result.token, COOKIE_OPTIONS);
                return res.status(200).json({
                    success: true,
                    tipo: result.tipo,
                    nome: result.nome
                });
            }
            return res.status(400).json({
                success: false,
                message: 'Falha na autenticação'
            });
        }
        catch (error) {
            console.error('Erro no login de paciente:', error);
            return res.status(401).json({
                success: false,
                message: error.message || 'Credenciais inválidas'
            });
        }
    }
    async logout(res) {
        try {
            res.clearCookie('auth_token', COOKIE_OPTIONS);
            return res.status(200).json({
                success: true,
                message: 'Logout realizado com sucesso'
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao realizar logout'
            });
        }
    }
    async getMe(req) {
        const userPayload = req.user;
        if (userPayload.multiplosPerfis === true) {
            return {
                success: true,
                ...userPayload
            };
        }
        try {
            if (userPayload.userType === 'paciente') {
                const paciente = await this.prismaService.patient.findUnique({
                    where: { cpf: userPayload.id },
                    select: {
                        name: true,
                        email: true,
                        cpf: true,
                        type: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                });
                if (!paciente) {
                    return {
                        success: false,
                        message: 'Paciente não encontrado'
                    };
                }
                return {
                    success: true,
                    ...userPayload,
                    userData: paciente,
                    nome: paciente.name
                };
            }
            else if (userPayload.userType === 'profissional') {
                const profissional = await this.prismaService.user.findUnique({
                    where: { cpf: userPayload.id },
                    select: {
                        name: true,
                        email: true,
                        cpf: true,
                        type: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                });
                if (!profissional) {
                    return {
                        success: false,
                        message: 'Profissional não encontrado'
                    };
                }
                return {
                    success: true,
                    ...userPayload,
                    userData: profissional,
                    nome: profissional.name
                };
            }
        }
        catch (error) {
            return {
                success: false,
                message: 'Erro ao buscar dados do usuário'
            };
        }
        return {
            success: true,
            ...userPayload
        };
    }
    async testAuth(req, headers) {
        return {
            cookies: {
                auth_token: req.cookies?.auth_token ? 'PRESENTE' : 'AUSENTE'
            },
            headers: {
                authorization: headers.authorization ? 'PRESENTE' : 'AUSENTE'
            },
            message: 'Endpoint de teste de autenticação'
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login/patient'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginPatient", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getMe", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('test-auth'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "testAuth", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('/api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        prisma_service_1.PrismaService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map