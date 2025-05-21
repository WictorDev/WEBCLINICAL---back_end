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
const jwt_guard_1 = require("../auth/jwt.guard");
const schedule_1 = require("../../domain/entities/schedule");
const crypto_1 = require("crypto");
const create_schedule_usecase_1 = require("../../use-case/schedule/create-schedule.usecase");
const update_schedule_usecase_1 = require("../../use-case/schedule/update-schedule.usecase");
const delete_schedule_usecase_1 = require("../../use-case/schedule/delete-schedule.usecase");
const find_schedule_by_id_usecase_1 = require("../../use-case/schedule/find-schedule-by-id.usecase");
const find_schedule_by_employee_usecase_1 = require("../../use-case/schedule/find-schedule-by-employee.usecase");
const find_schedule_by_date_usecase_1 = require("../../use-case/schedule/find-schedule-by-date.usecase");
const find_all_schedules_usecase_1 = require("../../use-case/schedule/find-all-schedules.usecase");
const swagger_1 = require("@nestjs/swagger");
let ScheduleController = class ScheduleController {
    createSchedule;
    updateSchedule;
    deleteSchedule;
    findScheduleById;
    findScheduleByEmployee;
    findScheduleByDate;
    findAllSchedules;
    constructor(createSchedule, updateSchedule, deleteSchedule, findScheduleById, findScheduleByEmployee, findScheduleByDate, findAllSchedules) {
        this.createSchedule = createSchedule;
        this.updateSchedule = updateSchedule;
        this.deleteSchedule = deleteSchedule;
        this.findScheduleById = findScheduleById;
        this.findScheduleByEmployee = findScheduleByEmployee;
        this.findScheduleByDate = findScheduleByDate;
        this.findAllSchedules = findAllSchedules;
    }
    async findAll() {
        return this.findAllSchedules.execute();
    }
    async findById(id) {
        return this.findScheduleById.execute(id);
    }
    async findByEmployee(employeeId) {
        return this.findScheduleByEmployee.findAllByEmployee(employeeId);
    }
    async findAvailableByEmployee(employeeId) {
        return this.findScheduleByEmployee.findAvailableByEmployee(employeeId);
    }
    async findByDate(employeeId, date) {
        return this.findScheduleByDate.findByDate(employeeId, new Date(date));
    }
    async findAvailableByDate(employeeId, date) {
        return this.findScheduleByDate.findAvailableByDate(employeeId, new Date(date));
    }
    async create(scheduleData) {
        const schedule = new schedule_1.Schedule({
            id: (0, crypto_1.randomUUID)(),
            date: new Date(scheduleData.date),
            startTime: scheduleData.startTime,
            endTime: scheduleData.endTime,
            duration: scheduleData.duration,
            totalSlots: scheduleData.totalSlots,
            availableSlots: scheduleData.availableSlots,
            employeeId: scheduleData.employeeId,
            active: scheduleData.active,
        });
        return this.createSchedule.execute(schedule);
    }
    async update(id, scheduleData) {
        return this.updateSchedule.execute({
            id,
            ...scheduleData,
            date: scheduleData.date ? new Date(scheduleData.date) : undefined,
        });
    }
    async delete(id) {
        return this.deleteSchedule.execute(id);
    }
};
exports.ScheduleController = ScheduleController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findByEmployee", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId/available'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findAvailableByEmployee", null);
__decorate([
    (0, common_1.Get)('date/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findByDate", null);
__decorate([
    (0, common_1.Get)('date/:employeeId/available'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findAvailableByDate", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "delete", null);
exports.ScheduleController = ScheduleController = __decorate([
    (0, swagger_1.ApiTags)('schedules'),
    (0, common_1.Controller)('schedules'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [create_schedule_usecase_1.CreateScheduleUseCase,
        update_schedule_usecase_1.UpdateScheduleUseCase,
        delete_schedule_usecase_1.DeleteScheduleUseCase,
        find_schedule_by_id_usecase_1.FindScheduleByIdUseCase,
        find_schedule_by_employee_usecase_1.FindScheduleByEmployeeUseCase,
        find_schedule_by_date_usecase_1.FindScheduleByDateUseCase,
        find_all_schedules_usecase_1.FindAllSchedulesUseCase])
], ScheduleController);
//# sourceMappingURL=schedule.controller.js.map