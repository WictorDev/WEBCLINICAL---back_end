"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRecoveryModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../../core/services/email.service");
const request_password_recovery_usecase_1 = require("../../use-case/patient/request-password-recovery.usecase");
const password_recovery_controller_1 = require("../controllers/password-recovery.controller");
const patient_module_1 = require("./patient.module");
let PasswordRecoveryModule = class PasswordRecoveryModule {
};
exports.PasswordRecoveryModule = PasswordRecoveryModule;
exports.PasswordRecoveryModule = PasswordRecoveryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            patient_module_1.PatientModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'your-secret-key',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [password_recovery_controller_1.PasswordRecoveryController],
        providers: [
            email_service_1.EmailService,
            request_password_recovery_usecase_1.RequestPasswordRecoveryUseCase,
        ],
        exports: [email_service_1.EmailService],
    })
], PasswordRecoveryModule);
//# sourceMappingURL=password-recovery.module.js.map