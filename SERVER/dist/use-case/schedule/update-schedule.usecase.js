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
exports.UpdateScheduleUseCase = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("../../domain/entities/schedule");
const schedule_repository_1 = require("../../domain/repositories/schedule.repository");
let UpdateScheduleUseCase = class UpdateScheduleUseCase {
    scheduleRepository;
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }
    async execute(data) {
        const schedule = await this.scheduleRepository.findById(data.id);
        if (!schedule) {
            throw new common_1.NotFoundException('Agenda não encontrada.');
        }
        const updatedSchedule = new schedule_1.Schedule({
            id: schedule.id,
            date: data.date ?? schedule.date,
            startTime: data.startTime ?? schedule.startTime,
            endTime: data.endTime ?? schedule.endTime,
            duration: data.duration ?? schedule.duration,
            totalSlots: data.totalSlots ?? schedule.totalSlots,
            availableSlots: data.availableSlots ?? schedule.availableSlots,
            employeeId: data.employeeId ?? schedule.employeeId,
            active: data.active ?? schedule.active
        });
        return this.scheduleRepository.update(data.id, updatedSchedule);
    }
};
exports.UpdateScheduleUseCase = UpdateScheduleUseCase;
exports.UpdateScheduleUseCase = UpdateScheduleUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [schedule_repository_1.ScheduleRepository])
], UpdateScheduleUseCase);
//# sourceMappingURL=update-schedule.usecase.js.map