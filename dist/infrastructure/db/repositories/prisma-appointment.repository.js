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
const library_1 = require("@prisma/client/runtime/library");
let PrismaAppointmentRepository = class PrismaAppointmentRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const appointment = await this.prisma.appointment.findUnique({
            where: { id: id.toString() }
        });
        if (!appointment)
            return null;
        return new appointment_1.Appointment({
            id: appointment.id,
            date: appointment.date,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            status: appointment.status,
            scheduleId: appointment.scheduleId || undefined,
            patientId: appointment.patientId,
            employeeId: appointment.employeeId
        });
    }
    async update(id, data) {
        try {
            const updated = await this.prisma.appointment.update({
                where: { id: id.toString() },
                data: {
                    date: data.date,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    status: data.status,
                    scheduleId: data.scheduleId,
                    patientId: data.patientId,
                    employeeId: data.employeeId
                }
            });
            return new appointment_1.Appointment({
                id: updated.id,
                date: updated.date,
                startTime: updated.startTime,
                endTime: updated.endTime,
                status: updated.status,
                scheduleId: updated.scheduleId || undefined,
                patientId: updated.patientId,
                employeeId: updated.employeeId
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new common_1.ConflictException('Agendamento não encontrado.');
            }
            throw error;
        }
    }
    async findByPatient(patientId) {
        const appointments = await this.prisma.appointment.findMany({
            where: { patientId }
        });
        return appointments.map(appointment => new appointment_1.Appointment({
            id: appointment.id,
            date: appointment.date,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            status: appointment.status,
            scheduleId: appointment.scheduleId || undefined,
            patientId: appointment.patientId,
            employeeId: appointment.employeeId
        }));
    }
    async findByEmployee(employeeId, date) {
        const where = date ? {
            employeeId,
            date: {
                gte: new Date(date.setHours(0, 0, 0, 0)),
                lt: new Date(date.setHours(23, 59, 59, 999))
            }
        } : { employeeId };
        const appointments = await this.prisma.appointment.findMany({ where });
        return appointments.map(appointment => new appointment_1.Appointment({
            id: appointment.id,
            date: appointment.date,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            status: appointment.status,
            scheduleId: appointment.scheduleId || undefined,
            patientId: appointment.patientId,
            employeeId: appointment.employeeId
        }));
    }
    async create(appointment) {
        try {
            const created = await this.prisma.appointment.create({
                data: {
                    date: appointment.date,
                    startTime: appointment.startTime,
                    endTime: appointment.endTime,
                    status: appointment.status,
                    scheduleId: appointment.scheduleId,
                    patientId: appointment.patientId,
                    employeeId: appointment.employeeId
                }
            });
            return new appointment_1.Appointment({
                id: created.id,
                date: created.date,
                startTime: created.startTime,
                endTime: created.endTime,
                status: created.status,
                scheduleId: created.scheduleId || undefined,
                patientId: created.patientId,
                employeeId: created.employeeId
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException('Já existe um agendamento para este horário.');
                }
                if (error.code === 'P2003') {
                    throw new common_1.ConflictException('Agenda ou paciente não encontrado.');
                }
            }
            throw error;
        }
    }
    async updateStatus(id, status) {
        try {
            const updated = await this.prisma.appointment.update({
                where: { id: id.toString() },
                data: { status }
            });
            return new appointment_1.Appointment({
                id: updated.id,
                date: updated.date,
                startTime: updated.startTime,
                endTime: updated.endTime,
                status: updated.status,
                scheduleId: updated.scheduleId || undefined,
                patientId: updated.patientId,
                employeeId: updated.employeeId
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new common_1.ConflictException('Agendamento não encontrado.');
            }
            throw error;
        }
    }
};
exports.PrismaAppointmentRepository = PrismaAppointmentRepository;
exports.PrismaAppointmentRepository = PrismaAppointmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAppointmentRepository);
//# sourceMappingURL=prisma-appointment.repository.js.map