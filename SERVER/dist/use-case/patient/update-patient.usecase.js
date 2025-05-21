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
exports.UpdatePatientUseCase = void 0;
const common_1 = require("@nestjs/common");
const patient_repository_1 = require("../../domain/repositories/patient.repository");
const bcrypt = require("bcrypt");
let UpdatePatientUseCase = class UpdatePatientUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(cpf, data) {
        const patient = await this.repo.findByCpf(cpf);
        if (!patient) {
            throw new Error('Paciente não encontrado.');
        }
        const updateData = {};
        if (data.name) {
            updateData.name = data.name;
        }
        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            updateData.password = hashedPassword;
        }
        return this.repo.update(cpf, updateData);
    }
};
exports.UpdatePatientUseCase = UpdatePatientUseCase;
exports.UpdatePatientUseCase = UpdatePatientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [patient_repository_1.PatientRepository])
], UpdatePatientUseCase);
//# sourceMappingURL=update-patient.usecase.js.map