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
exports.CancelAppointmentUseCase = void 0;
const common_1 = require("@nestjs/common");
const appointment_repository_1 = require("../../domain/repositories/appointment.repository");
const schedule_repository_1 = require("../../domain/repositories/schedule.repository");
let CancelAppointmentUseCase = class CancelAppointmentUseCase {
    appointmentRepository;
    scheduleRepository;
    constructor(appointmentRepository, scheduleRepository) {
        this.appointmentRepository = appointmentRepository;
        this.scheduleRepository = scheduleRepository;
    }
    async execute(id) {
        const appointment = await this.appointmentRepository.findById(id);
        if (!appointment) {
            throw new common_1.BadRequestException('Agendamento não encontrado.');
        }
        if (appointment.status === 'CANCELADO') {
            throw new common_1.BadRequestException('Agendamento já está cancelado.');
        }
        if (!appointment.scheduleId) {
            throw new common_1.BadRequestException('Agenda não encontrada para este agendamento.');
        }
        const schedule = await this.scheduleRepository.findById(appointment.scheduleId);
        if (!schedule) {
            throw new common_1.BadRequestException('Agenda não encontrada.');
        }
        await this.appointmentRepository.updateStatus(id, 'CANCELADO');
    }
};
exports.CancelAppointmentUseCase = CancelAppointmentUseCase;
exports.CancelAppointmentUseCase = CancelAppointmentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [appointment_repository_1.AppointmentRepository,
        schedule_repository_1.ScheduleRepository])
], CancelAppointmentUseCase);
//# sourceMappingURL=cancel-appointment.usecase.js.map