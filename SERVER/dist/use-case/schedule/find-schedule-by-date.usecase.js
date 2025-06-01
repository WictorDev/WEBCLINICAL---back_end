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
exports.FindScheduleByDateUseCase = void 0;
const common_1 = require("@nestjs/common");
const schedule_repository_1 = require("../../domain/repositories/schedule.repository");
let FindScheduleByDateUseCase = class FindScheduleByDateUseCase {
    scheduleRepository;
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }
    async findByDate(employeeId, date) {
        return await this.scheduleRepository.findByDate(employeeId, date);
    }
    async findAvailableByDate(employeeId, date, active = true) {
        return await this.scheduleRepository.findAvailableByDate(employeeId, date, active);
    }
};
exports.FindScheduleByDateUseCase = FindScheduleByDateUseCase;
exports.FindScheduleByDateUseCase = FindScheduleByDateUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [schedule_repository_1.ScheduleRepository])
], FindScheduleByDateUseCase);
//# sourceMappingURL=find-schedule-by-date.usecase.js.map