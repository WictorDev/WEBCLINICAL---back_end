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
const create_schedule_usecase_1 = require("../../use-case/schedule/create-schedule.usecase");
const update_schedule_usecase_1 = require("../../use-case/schedule/update-schedule.usecase");
const delete_schedule_usecase_1 = require("../../use-case/schedule/delete-schedule.usecase");
const find_schedule_by_id_usecase_1 = require("../../use-case/schedule/find-schedule-by-id.usecase");
const find_schedules_by_employee_usecase_1 = require("../../use-case/schedule/find-schedules-by-employee.usecase");
const find_available_schedules_usecase_1 = require("../../use-case/schedule/find-available-schedules.usecase");
const find_all_avaiable_schedules_usecase_1 = require("../../use-case/schedule/find-all-avaiable-schedules.usecase");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/jwt.guard");
const public_decorator_1 = require("../auth/public.decorator");
let ScheduleController = class ScheduleController {
    createScheduleUseCase;
    updateScheduleUseCase;
    deleteScheduleUseCase;
    findScheduleByIdUseCase;
    findSchedulesByEmployeeUseCase;
    findAvailableSchedulesUseCase;
    findAllAvailableSchedulesUseCase;
    constructor(createScheduleUseCase, updateScheduleUseCase, deleteScheduleUseCase, findScheduleByIdUseCase, findSchedulesByEmployeeUseCase, findAvailableSchedulesUseCase, findAllAvailableSchedulesUseCase) {
        this.createScheduleUseCase = createScheduleUseCase;
        this.updateScheduleUseCase = updateScheduleUseCase;
        this.deleteScheduleUseCase = deleteScheduleUseCase;
        this.findScheduleByIdUseCase = findScheduleByIdUseCase;
        this.findSchedulesByEmployeeUseCase = findSchedulesByEmployeeUseCase;
        this.findAvailableSchedulesUseCase = findAvailableSchedulesUseCase;
        this.findAllAvailableSchedulesUseCase = findAllAvailableSchedulesUseCase;
    }
    async create(data) {
        return this.createScheduleUseCase.execute(data);
    }
    async update(id, data) {
        return this.updateScheduleUseCase.execute({ id, ...data });
    }
    async delete(id) {
        return this.deleteScheduleUseCase.execute(id);
    }
    async findAllAvailable() {
        return this.findAllAvailableSchedulesUseCase.execute(true);
    }
    async findById(id) {
        return this.findScheduleByIdUseCase.execute(id);
    }
    async findByEmployee(employeeId, date) {
        return this.findSchedulesByEmployeeUseCase.execute(employeeId, date);
    }
    async findAvailable(employeeId, date) {
        return this.findAvailableSchedulesUseCase.execute(employeeId, date);
    }
};
exports.ScheduleController = ScheduleController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar uma nova agenda' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                date: {
                    type: 'string',
                    format: 'date-time',
                    example: '2024-03-20T10:00:00Z',
                    description: 'Data da agenda'
                },
                startTime: {
                    type: 'string',
                    example: '09:00',
                    description: 'Horário de início no formato HH:mm'
                },
                duration: {
                    type: 'number',
                    example: 30,
                    description: 'Duração da consulta em minutos'
                },
                employeeId: {
                    type: 'string',
                    example: '98765432100',
                    description: 'CPF do funcionário'
                }
            },
            required: ['date', 'startTime', 'duration', 'employeeId']
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Agenda criada com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
                date: { type: 'string', format: 'date-time', example: '2024-03-20T10:00:00Z' },
                startTime: { type: 'string', example: '09:00' },
                endTime: { type: 'string', example: '09:30' },
                duration: { type: 'number', example: 30 },
                employeeId: { type: 'string', example: '987.654.321-00' },
                active: { type: 'boolean', example: true }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflito de horário' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar uma agenda existente' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da agenda' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                date: { type: 'string', format: 'date-time', example: '2024-03-20T10:00:00Z' },
                startTime: { type: 'string', example: '09:00' },
                endTime: { type: 'string', example: '09:30' },
                duration: { type: 'number', example: 30 },
                employeeId: { type: 'string', example: '123.456.789-00' },
                active: { type: 'boolean', example: true }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Agenda atualizada com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Agenda não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Excluir uma agenda' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da agenda' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Agenda excluída com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Agenda não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "delete", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('available'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar agendas disponíveis' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de agendas disponíveis encontrada' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findAllAvailable", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar uma agenda por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da agenda' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Agenda encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Agenda não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar agendas de um funcionário' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId', description: 'CPF do funcionário' }),
    (0, swagger_1.ApiQuery)({ name: 'date', required: false, type: Date, description: 'Data para filtrar as agendas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de agendas encontrada' }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)('date', new common_1.ParseDatePipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findByEmployee", null);
__decorate([
    (0, common_1.Get)('available/:employeeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar agendas disponíveis de um funcionário' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId', description: 'CPF do funcionário' }),
    (0, swagger_1.ApiQuery)({ name: 'date', required: false, type: Date, description: 'Data para filtrar as agendas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de agendas disponíveis encontrada' }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)('date', new common_1.ParseDatePipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findAvailable", null);
exports.ScheduleController = ScheduleController = __decorate([
    (0, swagger_1.ApiTags)('schedules'),
    (0, common_1.Controller)('api/schedules'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [create_schedule_usecase_1.CreateScheduleUseCase,
        update_schedule_usecase_1.UpdateScheduleUseCase,
        delete_schedule_usecase_1.DeleteScheduleUseCase,
        find_schedule_by_id_usecase_1.FindScheduleByIdUseCase,
        find_schedules_by_employee_usecase_1.FindSchedulesByEmployeeUseCase,
        find_available_schedules_usecase_1.FindAvailableSchedulesUseCase,
        find_all_avaiable_schedules_usecase_1.FindAllAvailableSchedulesUseCase])
], ScheduleController);
//# sourceMappingURL=schedule.controller.js.map