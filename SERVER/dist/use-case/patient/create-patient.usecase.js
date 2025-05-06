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
const patient_1 = require("../../domain/entities/patient");
const unique_entity_cpf_1 = require("../../core/entities/unique-entity-cpf");
const type_repository_1 = require("../../domain/repositories/type.repository");
const bcrypt = require("bcrypt");
let CreatePatientUseCase = class CreatePatientUseCase {
    patientRepository;
    typeRepository;
    constructor(patientRepository, typeRepository) {
        this.patientRepository = patientRepository;
        this.typeRepository = typeRepository;
    }
    async execute(data) {
        const type = await this.typeRepository.findByName('Patient');
        if (!type) {
            throw new common_1.BadRequestException('Tipo padrão Patient não encontrado.');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const patient = new patient_1.Patient({
            cpf: new unique_entity_cpf_1.UniqueEntityCpf(data.cpf),
            name: data.name,
            email: data.email,
            password: hashedPassword,
            type: type.id,
        });
        return this.patientRepository.create(patient);
    }
};
exports.CreatePatientUseCase = CreatePatientUseCase;
exports.CreatePatientUseCase = CreatePatientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [patient_repository_1.PatientRepository,
        type_repository_1.TypeRepository])
], CreatePatientUseCase);
//# sourceMappingURL=create-patient.usecase.js.map