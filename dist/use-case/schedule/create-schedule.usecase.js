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
exports.CreateScheduleUseCase = void 0;
const common_1 = require("@nestjs/common");
const schedule_repository_1 = require("../../domain/repositories/schedule.repository");
const schedule_1 = require("../../domain/entities/schedule");
const crypto_1 = require("crypto");
const appointment_1 = require("../../domain/entities/appointment");
const appointment_repository_1 = require("../../domain/repositories/appointment.repository");
let CreateScheduleUseCase = class CreateScheduleUseCase {
    scheduleRepository;
    appointmentRepository;
    constructor(scheduleRepository, appointmentRepository) {
        this.scheduleRepository = scheduleRepository;
        this.appointmentRepository = appointmentRepository;
    }
    hasTimeConflict(existingSchedules, newStartTime, newEndTime) {
        return existingSchedules.some(schedule => {
            const [newStartHours, newStartMinutes] = newStartTime.split(':').map(Number);
            const [newEndHours, newEndMinutes] = newEndTime.split(':').map(Number);
            const [existingStartHours, existingStartMinutes] = schedule.startTime.split(':').map(Number);
            const [existingEndHours, existingEndMinutes] = schedule.endTime.split(':').map(Number);
            const newStartInMinutes = newStartHours * 60 + newStartMinutes;
            const newEndInMinutes = newEndHours * 60 + newEndMinutes;
            const existingStartInMinutes = existingStartHours * 60 + existingStartMinutes;
            const existingEndInMinutes = existingEndHours * 60 + existingEndMinutes;
            return ((newStartInMinutes >= existingStartInMinutes && newStartInMinutes < existingEndInMinutes) ||
                (newEndInMinutes > existingStartInMinutes && newEndInMinutes <= existingEndInMinutes) ||
                (newStartInMinutes <= existingStartInMinutes && newEndInMinutes >= existingEndInMinutes));
        });
    }
    isPastDateTime(dateStr, time) {
        const now = new Date();
        const [hours, minutes] = time.split(':').map(Number);
        const inputDate = new Date(dateStr);
        const scheduleDate = new Date(Date.UTC(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), inputDate.getUTCDate(), hours, minutes, 0, 0));
        const currentDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), 0, 0));
        return scheduleDate < currentDate;
    }
    async execute(data) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(data.startTime) || !timeRegex.test(data.endTime)) {
            throw new common_1.ConflictException('Horário inválido. Use o formato HH:mm.');
        }
        if (this.isPastDateTime(data.date, data.startTime)) {
            throw new common_1.ConflictException('Não é possível criar agendas para datas e horários passados.');
        }
        const scheduleDate = typeof data.date === 'string' ? new Date(data.date) : data.date;
        const existingSchedules = (await this.scheduleRepository.findByDate(data.employeeId, scheduleDate))
            .filter(s => s.active);
        console.log('[CREATE SCHEDULE] Horários existentes ativos:', existingSchedules.map(s => ({ startTime: s.startTime, endTime: s.endTime })));
        if (this.hasTimeConflict(existingSchedules, data.startTime, data.endTime)) {
            throw new common_1.ConflictException('Já existe uma agenda para este funcionário no mesmo horário');
        }
        const schedule = new schedule_1.Schedule({
            id: (0, crypto_1.randomUUID)(),
            date: scheduleDate,
            startTime: data.startTime,
            endTime: data.endTime,
            employeeId: data.employeeId,
            active: true
        });
        const createdSchedule = await this.scheduleRepository.create(schedule);
        const [startHour, startMinute] = data.startTime.split(':').map(Number);
        const [endHour, endMinute] = data.endTime.split(':').map(Number);
        const start = new Date(scheduleDate);
        start.setUTCHours(startHour, startMinute, 0, 0);
        const end = new Date(scheduleDate);
        end.setUTCHours(endHour, endMinute, 0, 0);
        let slotStart = new Date(start);
        while (slotStart < end) {
            const slotEnd = new Date(slotStart.getTime() + data.slotDuration * 60000);
            if (slotEnd > end)
                break;
            await this.appointmentRepository.create(new appointment_1.Appointment({
                id: (0, crypto_1.randomUUID)(),
                date: schedule.date,
                startTime: slotStart.toTimeString().slice(0, 5),
                endTime: slotEnd.toTimeString().slice(0, 5),
                scheduleId: createdSchedule.id,
                employeeId: data.employeeId,
                status: appointment_1.AppointmentStatus.AVAILABLE,
                patientId: undefined
            }));
            slotStart = slotEnd;
        }
        return createdSchedule;
    }
};
exports.CreateScheduleUseCase = CreateScheduleUseCase;
exports.CreateScheduleUseCase = CreateScheduleUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [schedule_repository_1.ScheduleRepository,
        appointment_repository_1.AppointmentRepository])
], CreateScheduleUseCase);
//# sourceMappingURL=create-schedule.usecase.js.map