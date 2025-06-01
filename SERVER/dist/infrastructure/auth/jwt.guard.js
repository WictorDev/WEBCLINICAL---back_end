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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const public_decorator_1 = require("./public.decorator");
let JwtAuthGuard = class JwtAuthGuard {
    jwtService;
    reflector;
    constructor(jwtService, reflector) {
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        let token = request.cookies?.token;
        console.log('JwtGuard - Token do cookie:', token);
        if (!token) {
            token = request.headers['authorization']?.split(' ')[1];
            console.log('JwtGuard - Token do header Authorization:', token);
        }
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('JwtGuard - isPublic:', isPublic);
        if (isPublic) {
            console.log('JwtGuard - Rota pública, liberando acesso.');
            return true;
        }
        if (!token) {
            console.log('JwtGuard - Token não encontrado!');
            throw new common_1.UnauthorizedException('Token não encontrado');
        }
        try {
            const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            console.log('JwtGuard - Payload decodificado:', payload);
            request.user = payload;
            return true;
        }
        catch (error) {
            console.log('JwtGuard - Erro ao verificar token:', error);
            throw new common_1.UnauthorizedException('Token inválido ou expirado');
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        core_1.Reflector])
], JwtAuthGuard);
//# sourceMappingURL=jwt.guard.js.map