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
let CreateScheduleUseCase = class CreateScheduleUseCase {
    scheduleRepository;
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
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
    async execute(data) {
        const [hours, minutes] = data.startTime.split(':').map(Number);
        const startTimeInMinutes = hours * 60 + minutes;
        const totalDurationInMinutes = data.duration * data.totalSlots;
        const endTimeInMinutes = startTimeInMinutes + totalDurationInMinutes;
        const endHours = Math.floor(endTimeInMinutes / 60);
        const endMinutes = endTimeInMinutes % 60;
        const endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
        const existingSchedules = await this.scheduleRepository.findByDate(data.employeeId, data.date);
        if (this.hasTimeConflict(existingSchedules, data.startTime, endTime)) {
            throw new common_1.ConflictException('Já existe uma agenda para este funcionário no mesmo horário');
        }
        const schedule = new schedule_1.Schedule({
            id: (0, crypto_1.randomUUID)(),
            date: data.date,
            startTime: data.startTime,
            endTime,
            duration: Number(data.duration),
            totalSlots: data.totalSlots,
            availableSlots: data.totalSlots,
            employeeId: data.employeeId,
            active: true
        });
        return this.scheduleRepository.create(schedule);
    }
};
exports.CreateScheduleUseCase = CreateScheduleUseCase;
exports.CreateScheduleUseCase = CreateScheduleUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [schedule_repository_1.ScheduleRepository])
], CreateScheduleUseCase);
//# sourceMappingURL=create-schedule.usecase.js.map