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
    async findAvailableByEmployee(employeeId, dayOfWeek) {
        const schedules = await this.prisma.schedule.findMany({
            where: { employeeId, dayOfWeek },
        });
        return schedules.map(s => new schedule_1.Schedule({
            id: s.id,
            dayOfWeek: s.dayOfWeek,
            startTime: s.startTime,
            endTime: s.endTime,
            employeeId: s.employeeId
        }));
    }
    async create(schedule) {
        const s = await this.prisma.schedule.create({
            data: {
                id: schedule.id,
                dayOfWeek: schedule.dayOfWeek,
                startTime: schedule.startTime,
                endTime: schedule.endTime,
                employeeId: schedule.employeeId,
            },
        });
        return new schedule_1.Schedule({
            id: s.id,
            dayOfWeek: s.dayOfWeek,
            startTime: s.startTime,
            endTime: s.endTime,
            employeeId: s.employeeId
        });
    }
};
exports.PrismaScheduleRepository = PrismaScheduleRepository;
exports.PrismaScheduleRepository = PrismaScheduleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaScheduleRepository);
//# sourceMappingURL=prisma-schedule.repository.js.map