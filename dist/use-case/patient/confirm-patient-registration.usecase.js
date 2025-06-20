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
exports.ConfirmPatientRegistrationUseCase = void 0;
const common_1 = require("@nestjs/common");
const patient_repository_1 = require("../../domain/repositories/patient.repository");
const patient_1 = require("../../domain/entities/patient");
const unique_entity_cpf_1 = require("../../core/entities/unique-entity-cpf");
const jwt_1 = require("@nestjs/jwt");
const library_1 = require("@prisma/client/runtime/library");
let ConfirmPatientRegistrationUseCase = class ConfirmPatientRegistrationUseCase {
    patientRepository;
    jwtService;
    constructor(patientRepository, jwtService) {
        this.patientRepository = patientRepository;
        this.jwtService = jwtService;
    }
    async execute(token) {
        try {
            const payload = this.jwtService.verify(token);
            if (payload.type !== 'patient-confirmation') {
                throw new common_1.UnauthorizedException('Token inválido');
            }
            const existingPatient = await this.patientRepository.findByEmail(payload.email);
            if (existingPatient) {
                return existingPatient;
            }
            const existingPatientByCpf = await this.patientRepository.findByCpf(payload.cpf);
            if (existingPatientByCpf) {
                return existingPatientByCpf;
            }
            const patient = new patient_1.Patient({
                cpf: new unique_entity_cpf_1.UniqueEntityCpf(payload.cpf),
                name: payload.name,
                email: payload.email,
                password: payload.password,
                typeId: payload.typeId,
                phoneNumber: payload.phoneNumber,
            });
            try {
                const createdPatient = await this.patientRepository.create(patient);
                return createdPatient;
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2002') {
                    const existingPatient = await this.patientRepository.findByEmail(payload.email);
                    if (existingPatient) {
                        return existingPatient;
                    }
                    const existingPatientByCpf = await this.patientRepository.findByCpf(payload.cpf);
                    if (existingPatientByCpf) {
                        return existingPatientByCpf;
                    }
                }
                throw error;
            }
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
exports.ConfirmPatientRegistrationUseCase = ConfirmPatientRegistrationUseCase;
exports.ConfirmPatientRegistrationUseCase = ConfirmPatientRegistrationUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [patient_repository_1.PatientRepository,
        jwt_1.JwtService])
], ConfirmPatientRegistrationUseCase);
//# sourceMappingURL=confirm-patient-registration.usecase.js.map