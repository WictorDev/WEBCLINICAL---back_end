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
exports.RequestPasswordRecoveryUseCase = void 0;
const common_1 = require("@nestjs/common");
const patient_repository_1 = require("../../domain/repositories/patient.repository");
const email_service_1 = require("../../core/services/email.service");
const jwt_1 = require("@nestjs/jwt");
let RequestPasswordRecoveryUseCase = class RequestPasswordRecoveryUseCase {
    patientRepository;
    emailService;
    jwtService;
    constructor(patientRepository, emailService, jwtService) {
        this.patientRepository = patientRepository;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }
    async execute(email) {
        const patient = await this.patientRepository.findByEmail(email);
        if (!patient) {
            throw new common_1.NotFoundException('Email não encontrado em nossa base de dados');
        }
        const recoveryToken = this.jwtService.sign({ email, type: 'password-recovery' }, { expiresIn: '1h' });
        await this.emailService.sendPasswordRecoveryEmail(email, recoveryToken);
    }
};
exports.RequestPasswordRecoveryUseCase = RequestPasswordRecoveryUseCase;
exports.RequestPasswordRecoveryUseCase = RequestPasswordRecoveryUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [patient_repository_1.PatientRepository,
        email_service_1.EmailService,
        jwt_1.JwtService])
], RequestPasswordRecoveryUseCase);
//# sourceMappingURL=request-password-recovery.usecase.js.map