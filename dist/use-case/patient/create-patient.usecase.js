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
exports.CreatePatientUseCase = void 0;
const common_1 = require("@nestjs/common");
const patient_repository_1 = require("../../domain/repositories/patient.repository");
const type_repository_1 = require("../../domain/repositories/type.repository");
const email_service_1 = require("../../core/services/email.service");
const jwt_1 = require("@nestjs/jwt");
const phone_formatter_1 = require("../../core/utils/phone-formatter");
const bcrypt = require("bcrypt");
let CreatePatientUseCase = class CreatePatientUseCase {
    patientRepository;
    typeRepository;
    emailService;
    jwtService;
    constructor(patientRepository, typeRepository, emailService, jwtService) {
        this.patientRepository = patientRepository;
        this.typeRepository = typeRepository;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }
    async execute(data) {
        const existingPatient = await this.patientRepository.findByEmail(data.email);
        if (existingPatient) {
            throw new common_1.BadRequestException('Email já cadastrado.');
        }
        const existingPatientByCpf = await this.patientRepository.findByCpf(data.cpf);
        if (existingPatientByCpf) {
            throw new common_1.BadRequestException('CPF já cadastrado.');
        }
        const type = await this.typeRepository.findByName('PATIENT');
        if (!type) {
            throw new common_1.BadRequestException('Tipo padrão PATIENT não encontrado.');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const formattedPhoneNumber = phone_formatter_1.PhoneFormatter.format(data.phoneNumber);
        const confirmationToken = this.jwtService.sign({
            cpf: data.cpf,
            name: data.name,
            email: data.email,
            password: hashedPassword,
            typeId: type.id,
            phoneNumber: formattedPhoneNumber,
            type: 'patient-confirmation'
        }, { expiresIn: '24h' });
        await this.emailService.sendPatientConfirmationEmail(data.email, confirmationToken);
        return { message: 'Email de confirmação enviado. Verifique sua caixa de entrada para concluir o cadastro.' };
    }
};
exports.CreatePatientUseCase = CreatePatientUseCase;
exports.CreatePatientUseCase = CreatePatientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [patient_repository_1.PatientRepository,
        type_repository_1.TypeRepository,
        email_service_1.EmailService,
        jwt_1.JwtService])
], CreatePatientUseCase);
//# sourceMappingURL=create-patient.usecase.js.map