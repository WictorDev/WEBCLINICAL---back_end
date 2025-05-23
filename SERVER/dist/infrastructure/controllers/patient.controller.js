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
const find_patient_usecase_1 = require("../../use-case/patient/find-patient.usecase");
const find_patient_by_cpf_usecase_1 = require("../../use-case/patient/find-patient-by-cpf.usecase");
const find_patient_by_email_usecase_1 = require("../../use-case/patient/find-patient-by-email.usecase");
const jwt_guard_1 = require("../auth/jwt.guard");
const swagger_1 = require("@nestjs/swagger");
const unique_entity_cpf_1 = require("../../core/entities/unique-entity-cpf");
const update_patient_usecase_1 = require("../../use-case/patient/update-patient.usecase");
const type_repository_1 = require("../../domain/repositories/type.repository");
const create_patient_usecase_1 = require("../../use-case/patient/create-patient.usecase");
const public_decorator_1 = require("../auth/public.decorator");
let PatientController = class PatientController {
    typeRepository;
    createPatientUseCase;
    findPatientByCpfUseCase;
    findPatientByEmailUseCase;
    updatePatientUseCase;
    findAllPatientsUseCase;
    constructor(typeRepository, createPatientUseCase, findPatientByCpfUseCase, findPatientByEmailUseCase, updatePatientUseCase, findAllPatientsUseCase) {
        this.typeRepository = typeRepository;
        this.createPatientUseCase = createPatientUseCase;
        this.findPatientByCpfUseCase = findPatientByCpfUseCase;
        this.findPatientByEmailUseCase = findPatientByEmailUseCase;
        this.updatePatientUseCase = updatePatientUseCase;
        this.findAllPatientsUseCase = findAllPatientsUseCase;
    }
    async findAll() {
        return this.findAllPatientsUseCase.execute();
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
    async update(cpf, data) {
        return await this.updatePatientUseCase.execute(new unique_entity_cpf_1.UniqueEntityCpf(cpf), data);
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
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "register", null);
__decorate([
    (0, common_1.Put)(':cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "update", null);
exports.PatientController = PatientController = __decorate([
    (0, swagger_1.ApiTags)('patients'),
    (0, common_1.Controller)('/api/patients'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [type_repository_1.TypeRepository,
        create_patient_usecase_1.CreatePatientUseCase,
        find_patient_by_cpf_usecase_1.FindPatientByCpfUseCase,
        find_patient_by_email_usecase_1.FindPatientByEmailUseCase,
        update_patient_usecase_1.UpdatePatientUseCase,
        find_patient_usecase_1.FindPatientUseCase])
], PatientController);
//# sourceMappingURL=patient.controller.js.map