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
exports.CreateAppointmentUseCase = void 0;
const common_1 = require("@nestjs/common");
const appointment_repository_1 = require("../../domain/repositories/appointment.repository");
const schedule_repository_1 = require("../../domain/repositories/schedule.repository");
let CreateAppointmentUseCase = class CreateAppointmentUseCase {
    appointmentRepository;
    scheduleRepository;
    constructor(appointmentRepository, scheduleRepository) {
        this.appointmentRepository = appointmentRepository;
        this.scheduleRepository = scheduleRepository;
    }
    async execute(appointment) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(appointment.startTime) || !timeRegex.test(appointment.endTime)) {
            throw new common_1.BadRequestException('Formato de hora inválido. Use o formato HH:mm.');
        }
        if (!appointment.scheduleId) {
            throw new common_1.BadRequestException('ID da agenda é obrigatório.');
        }
        const schedule = await this.scheduleRepository.findById(appointment.scheduleId);
        if (!schedule) {
            throw new common_1.BadRequestException('Agenda não encontrada.');
        }
        if (appointment.startTime < schedule.startTime || appointment.endTime > schedule.endTime) {
            throw new common_1.BadRequestException('Horário fora do período da agenda.');
        }
        const existing = await this.appointmentRepository.findByEmployee(appointment.employeeId, appointment.date);
        const conflict = existing.some(a => a.startTime < appointment.endTime && appointment.startTime < a.endTime);
        if (conflict) {
            throw new common_1.BadRequestException('Conflito de horário para este funcionário.');
        }
        const newAppointment = await this.appointmentRepository.create(appointment);
        return newAppointment;
    }
};
exports.CreateAppointmentUseCase = CreateAppointmentUseCase;
exports.CreateAppointmentUseCase = CreateAppointmentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [appointment_repository_1.AppointmentRepository,
        schedule_repository_1.ScheduleRepository])
], CreateAppointmentUseCase);
//# sourceMappingURL=create-appointment.usecase.js.map