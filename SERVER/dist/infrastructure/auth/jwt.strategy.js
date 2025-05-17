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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService) {
        const secretKey = configService.get('JWT_SECRET');
        console.log('JWT Strategy inicializada. Secret definida:', !!secretKey);
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (req) => {
                    const hasCookie = !!req.cookies?.auth_token;
                    console.log('Cookie auth_token presente:', hasCookie);
                    const authHeader = req.headers.authorization;
                    const hasAuthHeader = !!authHeader && authHeader.startsWith('Bearer ');
                    console.log('Header Authorization presente:', hasAuthHeader);
                    let token = null;
                    if (hasCookie) {
                        token = req.cookies.auth_token;
                        console.log('Token extraído do cookie auth_token');
                    }
                    else if (hasAuthHeader) {
                        token = authHeader.substring(7);
                        console.log('Token extraído do header Authorization');
                    }
                    console.log('Token encontrado:', token ? 'SIM' : 'NÃO');
                    return token;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: secretKey,
        });
    }
    async validate(payload) {
        try {
            if (!payload || !payload.id) {
                throw new common_1.UnauthorizedException('Payload de token inválido');
            }
            const now = Math.floor(Date.now() / 1000);
            if (payload.exp && payload.exp < now) {
                throw new common_1.UnauthorizedException('Token expirado');
            }
            console.log('JWT validado para usuário:', payload.id, 'tipo:', payload.userType);
            return payload;
        }
        catch (error) {
            console.error('Erro ao validar JWT payload:', error.message);
            throw new common_1.UnauthorizedException('Token inválido');
        }
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map