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
exports.FinalizeAppointmentUseCase = void 0;
const common_1 = require("@nestjs/common");
const tokens_constants_1 = require("../../infrastructure/constants/tokens.constants");
const unique_entity_id_1 = require("../../core/entities/unique-entity-id");
let FinalizeAppointmentUseCase = class FinalizeAppointmentUseCase {
    medicalRecordRepository;
    appointmentRepository;
    constructor(medicalRecordRepository, appointmentRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
        this.appointmentRepository = appointmentRepository;
    }
    async execute(appointmentId, data) {
        const appointment = await this.appointmentRepository.findById(new unique_entity_id_1.UniqueEntityID(appointmentId));
        if (!appointment) {
            throw new Error('Agendamento não encontrado.');
        }
        if (appointment.status !== 'CONFIRMADO') {
            throw new Error('Apenas agendamentos confirmados podem ser finalizados.');
        }
        await this.appointmentRepository.updateStatus(new unique_entity_id_1.UniqueEntityID(appointmentId), 'FINALIZADO');
        const record = await this.medicalRecordRepository.create({
            ...data,
            id: '',
            createdAt: new Date(),
        });
        return record;
    }
};
exports.FinalizeAppointmentUseCase = FinalizeAppointmentUseCase;
exports.FinalizeAppointmentUseCase = FinalizeAppointmentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tokens_constants_1.MEDICAL_RECORD_REPOSITORY_TOKEN)),
    __param(1, (0, common_1.Inject)(tokens_constants_1.APPOINTMENT_REPOSITORY_TOKEN)),
    __metadata("design:paramtypes", [Object, Object])
], FinalizeAppointmentUseCase);
//# sourceMappingURL=finalize-appointment.usecase.js.map