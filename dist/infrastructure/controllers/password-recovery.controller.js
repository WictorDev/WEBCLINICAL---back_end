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
exports.PasswordRecoveryController = void 0;
const common_1 = require("@nestjs/common");
const request_password_recovery_usecase_1 = require("../../use-case/patient/request-password-recovery.usecase");
const recovery_password_usecase_1 = require("../../use-case/patient/recovery-password.usecase");
const public_decorator_1 = require("../auth/public.decorator");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
let PasswordRecoveryController = class PasswordRecoveryController {
    requestPasswordRecoveryUseCase;
    recoveryPasswordUseCase;
    jwtService;
    constructor(requestPasswordRecoveryUseCase, recoveryPasswordUseCase, jwtService) {
        this.requestPasswordRecoveryUseCase = requestPasswordRecoveryUseCase;
        this.recoveryPasswordUseCase = recoveryPasswordUseCase;
        this.jwtService = jwtService;
    }
    async requestRecovery(body) {
        await this.requestPasswordRecoveryUseCase.execute(body.email);
        return { message: 'Email de recuperação enviado com sucesso' };
    }
    async resetPassword(body) {
        try {
            const payload = this.jwtService.verify(body.token);
            if (payload.type !== 'password-recovery') {
                throw new common_1.UnauthorizedException('Token inválido');
            }
            const email = payload.email;
            await this.recoveryPasswordUseCase.execute(email, body.newPassword);
            return { message: 'Senha redefinida com sucesso' };
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new common_1.UnauthorizedException('Token expirado');
            }
            if (error.name === 'JsonWebTokenError') {
                throw new common_1.UnauthorizedException('Token inválido');
            }
            throw error;
        }
    }
};
exports.PasswordRecoveryController = PasswordRecoveryController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('request'),
    (0, swagger_1.ApiOperation)({ summary: 'Solicitar recuperação de senha' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Email de recuperação enviado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Email não encontrado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PasswordRecoveryController.prototype, "requestRecovery", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('reset'),
    (0, swagger_1.ApiOperation)({ summary: 'Redefinir senha com token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Senha redefinida com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Token inválido ou expirado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PasswordRecoveryController.prototype, "resetPassword", null);
exports.PasswordRecoveryController = PasswordRecoveryController = __decorate([
    (0, swagger_1.ApiTags)('password-recovery'),
    (0, common_1.Controller)('/api/password-recovery'),
    __metadata("design:paramtypes", [request_password_recovery_usecase_1.RequestPasswordRecoveryUseCase,
        recovery_password_usecase_1.RecoveryPasswordUseCase,
        jwt_1.JwtService])
], PasswordRecoveryController);
//# sourceMappingURL=password-recovery.controller.js.map