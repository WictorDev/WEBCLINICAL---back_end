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
var PrismaScheduleRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaScheduleRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/services/prisma.service");
const schedule_1 = require("../../../domain/entities/schedule");
const client_1 = require("@prisma/client");
let PrismaScheduleRepository = PrismaScheduleRepository_1 = class PrismaScheduleRepository {
    prisma;
    logger = new common_1.Logger(PrismaScheduleRepository_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAvailableByEmployee(employeeId, dayOfWeek) {
        this.logger.log(`Buscando agendas disponíveis para funcionário ${employeeId} no dia ${dayOfWeek}`);
        try {
            const employee = await this.prisma.employee.findUnique({
                where: { cpf: employeeId }
            });
            if (!employee) {
                this.logger.warn(`Funcionário não encontrado: ${employeeId}`);
                throw new common_1.NotFoundException(`Funcionário com CPF ${employeeId} não encontrado`);
            }
            const schedules = await this.prisma.schedule.findMany({
                where: { employeeId, dayOfWeek },
            });
            this.logger.log(`Encontradas ${schedules.length} agendas para o funcionário ${employeeId}`);
            return schedules.map(s => new schedule_1.Schedule(s.id, s.dayOfWeek, s.startTime, s.endTime, s.employeeId));
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            this.logger.error(`Erro ao buscar agendas: ${error.message}`, error.stack);
            return [];
        }
    }
    async create(schedule) {
        this.logger.log(`Tentando criar agenda no banco: ${JSON.stringify(schedule)}`);
        try {
            const employee = await this.prisma.employee.findUnique({
                where: { cpf: schedule.employeeId }
            });
            if (!employee) {
                this.logger.warn(`Funcionário não encontrado: ${schedule.employeeId}`);
                throw new common_1.NotFoundException(`Funcionário com CPF ${schedule.employeeId} não encontrado`);
            }
            const existingSchedules = await this.prisma.schedule.findMany({
                where: {
                    employeeId: schedule.employeeId,
                    dayOfWeek: schedule.dayOfWeek,
                    OR: [
                        {
                            startTime: { lte: schedule.startTime },
                            endTime: { gt: schedule.startTime }
                        },
                        {
                            startTime: { lt: schedule.endTime },
                            endTime: { gte: schedule.endTime }
                        },
                        {
                            startTime: { gte: schedule.startTime },
                            endTime: { lte: schedule.endTime }
                        }
                    ]
                }
            });
            if (existingSchedules.length > 0) {
                this.logger.warn(`Conflito de horário detectado para ${schedule.employeeId} no dia ${schedule.dayOfWeek}`);
                throw new common_1.BadRequestException('Já existe um agendamento para este profissional neste horário');
            }
            const s = await this.prisma.schedule.create({
                data: {
                    id: schedule.id,
                    dayOfWeek: schedule.dayOfWeek,
                    startTime: schedule.startTime,
                    endTime: schedule.endTime,
                    employeeId: schedule.employeeId,
                },
            });
            this.logger.log(`Agenda criada com sucesso: ${JSON.stringify(s)}`);
            return new schedule_1.Schedule(s.id, s.dayOfWeek, s.startTime, s.endTime, s.employeeId);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    this.logger.error('Conflito de chave única ao criar agenda');
                    throw new common_1.BadRequestException('Já existe um agendamento com essas características');
                }
                else if (error.code === 'P2003') {
                    this.logger.error('Violação de chave estrangeira ao criar agenda');
                    throw new common_1.BadRequestException('O funcionário informado não existe');
                }
            }
            this.logger.error(`Erro ao criar agenda: ${error.message}`, error.stack);
            throw new common_1.BadRequestException('Erro ao criar agenda');
        }
    }
};
exports.PrismaScheduleRepository = PrismaScheduleRepository;
exports.PrismaScheduleRepository = PrismaScheduleRepository = PrismaScheduleRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaScheduleRepository);
//# sourceMappingURL=prisma-schedule.repository.js.map