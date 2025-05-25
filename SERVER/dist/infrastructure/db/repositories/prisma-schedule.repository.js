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
exports.PrismaScheduleRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/services/prisma.service");
const schedule_1 = require("../../../domain/entities/schedule");
const library_1 = require("@prisma/client/runtime/library");
let PrismaScheduleRepository = class PrismaScheduleRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(schedule) {
        try {
            const created = await this.prisma.schedule.create({
                data: {
                    id: schedule.id,
                    date: schedule.date,
                    startTime: schedule.startTime,
                    endTime: schedule.endTime,
                    duration: schedule.duration,
                    employeeId: schedule.employeeId,
                    appointmentId: schedule.appointmentId,
                    active: schedule.active
                }
            });
            return new schedule_1.Schedule({
                id: created.id,
                date: created.date,
                startTime: created.startTime,
                endTime: created.endTime,
                duration: created.duration,
                employeeId: created.employeeId,
                appointmentId: created.appointmentId || undefined,
                active: created.active
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException('Já existe uma agenda para este horário.');
                }
            }
            throw error;
        }
    }
    async update(id, data) {
        try {
            const updated = await this.prisma.schedule.update({
                where: { id },
                data: {
                    date: data.date,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    duration: data.duration,
                    appointmentId: data.appointmentId,
                    employeeId: data.employeeId,
                    active: data.active
                }
            });
            return new schedule_1.Schedule({
                id: updated.id,
                date: updated.date,
                startTime: updated.startTime,
                endTime: updated.endTime,
                duration: updated.duration,
                appointmentId: updated.appointmentId || undefined,
                employeeId: updated.employeeId,
                active: updated.active
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException('Agenda não encontrada.');
                }
            }
            throw error;
        }
    }
    async delete(id) {
        try {
            await this.prisma.schedule.delete({
                where: { id }
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException('Agenda não encontrada.');
                }
            }
            throw error;
        }
    }
    async findById(id) {
        const schedule = await this.prisma.schedule.findUnique({
            where: { id }
        });
        if (!schedule)
            return null;
        return new schedule_1.Schedule({
            id: schedule.id,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            duration: schedule.duration,
            appointmentId: schedule.appointmentId || undefined,
            employeeId: schedule.employeeId,
            active: schedule.active
        });
    }
    async findAll() {
        const schedules = await this.prisma.schedule.findMany({
            select: {
                id: true,
                date: true,
                startTime: true,
                endTime: true,
                duration: true,
                appointmentId: true,
                employeeId: true,
                active: true
            }
        });
        return schedules.map(schedule => new schedule_1.Schedule({
            id: schedule.id,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            duration: schedule.duration,
            appointmentId: schedule.appointmentId || undefined,
            employeeId: schedule.employeeId,
            active: schedule.active
        }));
    }
    async findByEmployeeId(employeeId) {
        const schedules = await this.prisma.schedule.findMany({
            where: { employeeId },
            select: {
                id: true,
                date: true,
                startTime: true,
                endTime: true,
                duration: true,
                appointmentId: true,
                employeeId: true,
                active: true
            }
        });
        return schedules.map(schedule => new schedule_1.Schedule({
            id: schedule.id,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            duration: schedule.duration,
            employeeId: schedule.employeeId,
            appointmentId: schedule.appointmentId || undefined,
            active: schedule.active
        }));
    }
    async findAvailableByEmployeeId(employeeId, active) {
        const schedules = await this.prisma.schedule.findMany({
            where: {
                employeeId,
                active,
                appointmentId: null
            },
            select: {
                id: true,
                date: true,
                startTime: true,
                endTime: true,
                duration: true,
                appointmentId: true,
                employeeId: true,
                active: true
            }
        });
        return schedules.map(schedule => new schedule_1.Schedule({
            id: schedule.id,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            duration: schedule.duration,
            employeeId: schedule.employeeId,
            appointmentId: schedule.appointmentId || undefined,
            active: schedule.active
        }));
    }
    async findByDate(employeeId, date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const schedules = await this.prisma.schedule.findMany({
            where: {
                employeeId,
                date: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            select: {
                id: true,
                date: true,
                startTime: true,
                endTime: true,
                duration: true,
                appointmentId: true,
                employeeId: true,
                active: true
            }
        });
        return schedules.map(schedule => new schedule_1.Schedule({
            id: schedule.id,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            duration: schedule.duration,
            employeeId: schedule.employeeId,
            appointmentId: schedule.appointmentId || undefined,
            active: schedule.active
        }));
    }
    async findAvailableByDate(employeeId, date, active) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const schedules = await this.prisma.schedule.findMany({
            where: {
                employeeId,
                active,
                appointmentId: null,
                date: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            select: {
                id: true,
                date: true,
                startTime: true,
                endTime: true,
                duration: true,
                appointmentId: true,
                employeeId: true,
                active: true
            }
        });
        return schedules.map(schedule => new schedule_1.Schedule({
            id: schedule.id,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            duration: schedule.duration,
            employeeId: schedule.employeeId,
            appointmentId: schedule.appointmentId || undefined,
            active: schedule.active
        }));
    }
    async findAllAvailable() {
        try {
            const schedules = await this.prisma.schedule.findMany({
                where: {
                    active: true,
                    appointmentId: null
                },
                include: {
                    employee: {
                        select: {
                            name: true,
                        }
                    }
                },
                orderBy: {
                    date: 'asc'
                }
            });
            return schedules.map(schedule => ({
                id: schedule.id,
                date: schedule.date,
                startTime: schedule.startTime,
                endTime: schedule.endTime,
                duration: schedule.duration,
                employeeId: schedule.employeeId,
                appointmentId: schedule.appointmentId || undefined,
                active: schedule.active,
                employee: schedule.employee ? { name: schedule.employee.name } : undefined
            }));
        }
        catch (error) {
            throw error;
        }
    }
};
exports.PrismaScheduleRepository = PrismaScheduleRepository;
exports.PrismaScheduleRepository = PrismaScheduleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaScheduleRepository);
//# sourceMappingURL=prisma-schedule.repository.js.map