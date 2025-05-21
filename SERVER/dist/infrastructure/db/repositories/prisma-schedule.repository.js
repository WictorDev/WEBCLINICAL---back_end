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
let PrismaScheduleRepository = class PrismaScheduleRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(schedule) {
        const s = await this.prisma.schedule.create({
            data: {
                id: schedule.id,
                date: schedule.date,
                startTime: schedule.startTime,
                endTime: schedule.endTime,
                duration: schedule.duration,
                totalSlots: schedule.totalSlots,
                availableSlots: schedule.availableSlots,
                employeeId: schedule.employeeId,
                active: schedule.active,
            },
        });
        return new schedule_1.Schedule({
            id: s.id,
            date: s.date,
            startTime: s.startTime,
            endTime: s.endTime,
            duration: s.duration,
            totalSlots: s.totalSlots,
            availableSlots: s.availableSlots,
            employeeId: s.employeeId,
            active: s.active,
        });
    }
    async update(id, data) {
        const updated = await this.prisma.schedule.update({
            where: { id },
            data,
        });
        return new schedule_1.Schedule({
            id: updated.id,
            date: updated.date,
            startTime: updated.startTime,
            endTime: updated.endTime,
            duration: updated.duration,
            totalSlots: updated.totalSlots,
            availableSlots: updated.availableSlots,
            employeeId: updated.employeeId,
            active: updated.active,
        });
    }
    async delete(id) {
        await this.prisma.schedule.delete({ where: { id } });
    }
    async findById(id) {
        const schedule = await this.prisma.schedule.findUnique({ where: { id } });
        if (!schedule)
            return null;
        return new schedule_1.Schedule({
            id: schedule.id,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            duration: schedule.duration,
            totalSlots: schedule.totalSlots,
            availableSlots: schedule.availableSlots,
            employeeId: schedule.employeeId,
            active: schedule.active,
        });
    }
    async findAll() {
        const schedules = await this.prisma.schedule.findMany();
        return schedules.map(s => new schedule_1.Schedule({
            id: s.id,
            date: s.date,
            startTime: s.startTime,
            endTime: s.endTime,
            duration: s.duration,
            totalSlots: s.totalSlots,
            availableSlots: s.availableSlots,
            employeeId: s.employeeId,
            active: s.active,
        }));
    }
    async findByEmployeeId(employeeId) {
        const schedules = await this.prisma.schedule.findMany({
            where: { employeeId },
        });
        return schedules.map(s => new schedule_1.Schedule({
            id: s.id,
            date: s.date,
            startTime: s.startTime,
            endTime: s.endTime,
            duration: s.duration,
            totalSlots: s.totalSlots,
            availableSlots: s.availableSlots,
            employeeId: s.employeeId,
            active: s.active,
        }));
    }
    async findAvailableByEmployeeId(employeeId, active) {
        const schedules = await this.prisma.schedule.findMany({
            where: { employeeId, active },
        });
        return schedules.map(s => new schedule_1.Schedule({
            id: s.id,
            date: s.date,
            startTime: s.startTime,
            endTime: s.endTime,
            duration: s.duration,
            totalSlots: s.totalSlots,
            availableSlots: s.availableSlots,
            employeeId: s.employeeId,
            active: s.active,
        }));
    }
    async findByDate(employeeId, date) {
        const schedules = await this.prisma.schedule.findMany({
            where: {
                employeeId,
                date: {
                    gte: new Date(date.setHours(0, 0, 0, 0)),
                    lt: new Date(date.setHours(23, 59, 59, 999)),
                },
            },
        });
        return schedules.map(s => new schedule_1.Schedule({
            id: s.id,
            date: s.date,
            startTime: s.startTime,
            endTime: s.endTime,
            duration: s.duration,
            totalSlots: s.totalSlots,
            availableSlots: s.availableSlots,
            employeeId: s.employeeId,
            active: s.active,
        }));
    }
    async findAvailableByDate(employeeId, date, active) {
        const schedules = await this.prisma.schedule.findMany({
            where: {
                employeeId,
                active,
                date: {
                    gte: new Date(date.setHours(0, 0, 0, 0)),
                    lt: new Date(date.setHours(23, 59, 59, 999)),
                },
            },
        });
        return schedules.map(s => new schedule_1.Schedule({
            id: s.id,
            date: s.date,
            startTime: s.startTime,
            endTime: s.endTime,
            duration: s.duration,
            totalSlots: s.totalSlots,
            availableSlots: s.availableSlots,
            employeeId: s.employeeId,
            active: s.active,
        }));
    }
};
exports.PrismaScheduleRepository = PrismaScheduleRepository;
exports.PrismaScheduleRepository = PrismaScheduleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaScheduleRepository);
//# sourceMappingURL=prisma-schedule.repository.js.map