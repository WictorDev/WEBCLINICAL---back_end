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
var ScheduleController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleController = void 0;
const common_1 = require("@nestjs/common");
const find_available_schedules_usecase_1 = require("../../use-case/schedule/find-available-schedules.usecase");
const create_schedule_usecase_1 = require("../../use-case/schedule/create-schedule.usecase");
const jwt_guard_1 = require("../auth/jwt.guard");
const schedule_1 = require("../../domain/entities/schedule");
const crypto_1 = require("crypto");
const prisma_service_1 = require("../../core/services/prisma.service");
const public_decorator_1 = require("../auth/public.decorator");
let ScheduleController = ScheduleController_1 = class ScheduleController {
    findAvailableSchedules;
    createSchedule;
    prismaService;
    logger = new common_1.Logger(ScheduleController_1.name);
    constructor(findAvailableSchedules, createSchedule, prismaService) {
        this.findAvailableSchedules = findAvailableSchedules;
        this.createSchedule = createSchedule;
        this.prismaService = prismaService;
    }
    async getAvailable(employeeId, dayOfWeek) {
        this.logger.log(`Buscando horários disponíveis para funcionário ${employeeId} no dia ${dayOfWeek}`);
        return this.findAvailableSchedules.execute(employeeId, Number(dayOfWeek));
    }
    async create(scheduleData, req) {
        this.logger.log(`Tentando criar agendamento: ${JSON.stringify(scheduleData)}`);
        try {
            if (!scheduleData.employeeId) {
                throw new common_1.BadRequestException('ID do funcionário é obrigatório');
            }
            if (scheduleData.dayOfWeek < 0 || scheduleData.dayOfWeek > 6) {
                throw new common_1.BadRequestException('Dia da semana inválido (0-6)');
            }
            if (!scheduleData.startTime || !scheduleData.endTime) {
                throw new common_1.BadRequestException('Horários de início e fim são obrigatórios');
            }
            const employeeExists = await this.prismaService.employee.findUnique({
                where: { cpf: scheduleData.employeeId }
            });
            if (!employeeExists) {
                this.logger.warn(`Funcionário não encontrado: ${scheduleData.employeeId}`);
                throw new common_1.BadRequestException('Funcionário não encontrado');
            }
            const schedule = new schedule_1.Schedule((0, crypto_1.randomUUID)(), scheduleData.dayOfWeek, scheduleData.startTime, scheduleData.endTime, scheduleData.employeeId);
            this.logger.log(`Criando agendamento: ${JSON.stringify(schedule)}`);
            const result = await this.createSchedule.execute(schedule);
            this.logger.log(`Agendamento criado com sucesso: ${JSON.stringify(result)}`);
            return result;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            this.logger.error(`Erro ao criar agendamento: ${error.message}`, error.stack);
            throw new common_1.InternalServerErrorException('Erro ao criar agendamento');
        }
    }
};
exports.ScheduleController = ScheduleController;
__decorate([
    (0, common_1.Get)('available'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Query)('employeeId')),
    __param(1, (0, common_1.Query)('dayOfWeek')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "getAvailable", null);
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "create", null);
exports.ScheduleController = ScheduleController = ScheduleController_1 = __decorate([
    (0, common_1.Controller)('/api/schedules'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [find_available_schedules_usecase_1.FindAvailableSchedulesUseCase,
        create_schedule_usecase_1.CreateScheduleUseCase,
        prisma_service_1.PrismaService])
], ScheduleController);
//# sourceMappingURL=schedule.controller.js.map