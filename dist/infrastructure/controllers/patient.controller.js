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
exports.PatientController = void 0;
const common_1 = require("@nestjs/common");
const create_patient_usecase_1 = require("../../use-case/patient/create-patient.usecase");
const find_patient_usecase_1 = require("../../use-case/patient/find-patient.usecase");
const find_patient_by_cpf_usecase_1 = require("../../use-case/patient/find-patient-by-cpf.usecase");
const find_patient_by_email_usecase_1 = require("../../use-case/patient/find-patient-by-email.usecase");
const jwt_guard_1 = require("../auth/jwt.guard");
const swagger_1 = require("@nestjs/swagger");
const unique_entity_cpf_1 = require("../../core/entities/unique-entity-cpf");
let PatientController = class PatientController {
    createPatientUseCase;
    findPatientUseCase;
    findPatientByCpfUseCase;
    findPatientByEmailUseCase;
    constructor(createPatientUseCase, findPatientUseCase, findPatientByCpfUseCase, findPatientByEmailUseCase) {
        this.createPatientUseCase = createPatientUseCase;
        this.findPatientUseCase = findPatientUseCase;
        this.findPatientByCpfUseCase = findPatientByCpfUseCase;
        this.findPatientByEmailUseCase = findPatientByEmailUseCase;
    }
    async findAll() {
        return this.findPatientUseCase.execute();
    }
    async findByEmail(email) {
        return this.findPatientByEmailUseCase.execute(email);
    }
    async findByCpf(cpf) {
        return this.findPatientByCpfUseCase.execute(new unique_entity_cpf_1.UniqueEntityCpf(cpf));
    }
    async register(body) {
        try {
            return await this.createPatientUseCase.execute(body);
        }
        catch (error) {
            if (error.message && error.message.includes('CPF')) {
                throw new common_1.BadRequestException(error.message);
            }
            throw error;
        }
    }
};
exports.PatientController = PatientController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Get)('cpf/:cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "findByCpf", null);
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "register", null);
exports.PatientController = PatientController = __decorate([
    (0, swagger_1.ApiTags)('patients'),
    (0, common_1.Controller)('/api/patients'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [create_patient_usecase_1.CreatePatientUseCase,
        find_patient_usecase_1.FindPatientUseCase,
        find_patient_by_cpf_usecase_1.FindPatientByCpfUseCase,
        find_patient_by_email_usecase_1.FindPatientByEmailUseCase])
], PatientController);
//# sourceMappingURL=patient.controller.js.map