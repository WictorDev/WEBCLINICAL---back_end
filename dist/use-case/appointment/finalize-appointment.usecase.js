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
exports.FinalizeAppointmentUseCase = void 0;
const common_1 = require("@nestjs/common");
const medical_record_repository_1 = require("../../domain/repositories/medical-record.repository");
const appointment_repository_1 = require("../../domain/repositories/appointment.repository");
const appointment_1 = require("../../domain/entities/appointment");
let FinalizeAppointmentUseCase = class FinalizeAppointmentUseCase {
    medicalRecordRepository;
    appointmentRepository;
    constructor(medicalRecordRepository, appointmentRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
        this.appointmentRepository = appointmentRepository;
    }
    async execute(appointmentId, data) {
        const appointment = await this.appointmentRepository.findById(appointmentId);
        if (!appointment) {
            throw new Error('Agendamento não encontrado.');
        }
        if (appointment.status !== appointment_1.AppointmentStatus.SCHEDULED) {
            throw new Error('Apenas agendamentos agendados podem ser finalizados.');
        }
        await this.appointmentRepository.updateStatus(appointmentId, appointment_1.AppointmentStatus.FINISHED);
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
    __metadata("design:paramtypes", [medical_record_repository_1.MedicalRecordRepository,
        appointment_repository_1.AppointmentRepository])
], FinalizeAppointmentUseCase);
//# sourceMappingURL=finalize-appointment.usecase.js.map