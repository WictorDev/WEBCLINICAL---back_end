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
exports.ScheduleController = void 0;
const common_1 = require("@nestjs/common");
const find_available_schedules_usecase_1 = require("../../use-case/schedule/find-available-schedules.usecase");
const create_schedule_usecase_1 = require("../../use-case/schedule/create-schedule.usecase");
const jwt_guard_1 = require("../auth/jwt.guard");
const schedule_1 = require("../../domain/entities/schedule");
const crypto_1 = require("crypto");
let ScheduleController = class ScheduleController {
    findAvailableSchedules;
    createSchedule;
    constructor(findAvailableSchedules, createSchedule) {
        this.findAvailableSchedules = findAvailableSchedules;
        this.createSchedule = createSchedule;
    }
    async getAvailable(employeeId, dayOfWeek) {
        return this.findAvailableSchedules.execute(employeeId, Number(dayOfWeek));
    }
    async create(scheduleData) {
        const schedule = new schedule_1.Schedule({
            id: (0, crypto_1.randomUUID)(),
            dayOfWeek: scheduleData.dayOfWeek,
            startTime: scheduleData.startTime,
            endTime: scheduleData.endTime,
            employeeId: scheduleData.employeeId
        });
        return this.createSchedule.execute(schedule);
    }
};
exports.ScheduleController = ScheduleController;
__decorate([
    (0, common_1.Get)('available'),
    __param(0, (0, common_1.Query)('employeeId')),
    __param(1, (0, common_1.Query)('dayOfWeek')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "getAvailable", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "create", null);
exports.ScheduleController = ScheduleController = __decorate([
    (0, common_1.Controller)('schedules'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [find_available_schedules_usecase_1.FindAvailableSchedulesUseCase,
        create_schedule_usecase_1.CreateScheduleUseCase])
], ScheduleController);
//# sourceMappingURL=schedule.controller.js.map