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
exports.PrismaAppointmentRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/services/prisma.service");
const appointment_1 = require("../../../domain/entities/appointment");
let PrismaAppointmentRepository = class PrismaAppointmentRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmployee(employeeId, date) {
        const where = { employeeId };
        if (date) {
            where.date = date;
        }
        const appointments = await this.prisma.appointment.findMany({ where });
        return appointments.map(a => new appointment_1.Appointment(a.id, a.date, a.startTime, a.endTime, a.status, a.scheduleId, a.patientId, a.employeeId));
    }
    async findByPatient(patientId) {
        const appointments = await this.prisma.appointment.findMany({ where: { patientId } });
        return appointments.map(a => new appointment_1.Appointment(a.id, a.date, a.startTime, a.endTime, a.status, a.scheduleId, a.patientId, a.employeeId));
    }
    async create(appointment) {
        const a = await this.prisma.appointment.create({
            data: {
                id: appointment.id,
                date: appointment.date,
                startTime: appointment.startTime,
                endTime: appointment.endTime,
                status: appointment.status,
                scheduleId: appointment.scheduleId,
                patientId: appointment.patientId,
                employeeId: appointment.employeeId,
            },
        });
        return new appointment_1.Appointment(a.id, a.date, a.startTime, a.endTime, a.status, a.scheduleId, a.patientId, a.employeeId);
    }
    async updateStatus(id, status) {
        const a = await this.prisma.appointment.update({ where: { id }, data: { status } });
        return new appointment_1.Appointment(a.id, a.date, a.startTime, a.endTime, a.status, a.scheduleId, a.patientId, a.employeeId);
    }
};
exports.PrismaAppointmentRepository = PrismaAppointmentRepository;
exports.PrismaAppointmentRepository = PrismaAppointmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAppointmentRepository);
//# sourceMappingURL=prisma-appointment.repository.js.map