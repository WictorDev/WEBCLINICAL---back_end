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
const user_repository_1 = require("../../domain/repositories/user.repository");
const user_1 = require("../../domain/entities/user");
let CreatePatientUseCase = class CreatePatientUseCase {
    patientRepository;
    typeRepository;
    userRepository;
    constructor(patientRepository, typeRepository, userRepository) {
        this.patientRepository = patientRepository;
        this.typeRepository = typeRepository;
        this.userRepository = userRepository;
    }
    async execute(data) {
        const type = await this.typeRepository.findByName(data.type);
        if (!type) {
            throw new common_1.BadRequestException(`Tipo ${data.type} não encontrado.`);
        }
        const existingUser = await this.userRepository.findByCpf(data.cpf);
        if (existingUser) {
            await this.userRepository.addType(data.cpf, type.id);
        }
        else {
            const user = new user_1.User({
                name: data.name,
                cpf: new unique_entity_cpf_1.UniqueEntityCpf(data.cpf),
                email: data.email,
                password: data.password,
                types: [type.id],
                active: true
            });
            try {
                await this.userRepository.create(user);
            }
            catch (error) {
                if (error.code === 'P2002' && error.meta?.target?.includes('cpf')) {
                    await this.userRepository.addType(data.cpf, type.id);
                }
                else {
                    throw error;
                }
            }
        }
        const patient = new patient_1.Patient({
            cpf: new unique_entity_cpf_1.UniqueEntityCpf(data.cpf),
            name: data.name,
            email: data.email,
            password: data.password,
            typeId: type.id,
        });
        return this.patientRepository.create(patient);
    }
};
exports.CreatePatientUseCase = CreatePatientUseCase;
exports.CreatePatientUseCase = CreatePatientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [patient_repository_1.PatientRepository,
        type_repository_1.TypeRepository,
        user_repository_1.UserRepository])
], CreatePatientUseCase);
//# sourceMappingURL=create-patient.usecase.js.map