import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/services/prisma.service';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { Appointment } from '../../../domain/entities/appointment';

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Appointment | null> {
    const appointment = await this.prisma.appointment.findUnique({ where: { id } });
    if (!appointment) return null;
    
    return new Appointment(
      appointment.id,
      appointment.date,
      appointment.startTime,
      appointment.endTime,
      appointment.status,
      appointment.scheduleId,
      appointment.patientId,
      appointment.employeeId
    );
  }

  async findByEmployee(employeeId: string, date?: Date): Promise<Appointment[]> {
    const where: any = { employeeId };
    if (date) {
      where.date = date;
    }
    const appointments = await this.prisma.appointment.findMany({ where });
    return appointments.map(a => new Appointment(
      a.id, a.date, a.startTime, a.endTime, a.status, a.scheduleId, a.patientId, a.employeeId
    ));
  }

  async findByPatient(patientId: string): Promise<Appointment[]> {
    const appointments = await this.prisma.appointment.findMany({ where: { patientId } });
    return appointments.map(a => new Appointment(
      a.id, a.date, a.startTime, a.endTime, a.status, a.scheduleId, a.patientId, a.employeeId
    ));
  }

  async create(appointment: Appointment): Promise<Appointment> {
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
    return new Appointment(a.id, a.date, a.startTime, a.endTime, a.status, a.scheduleId, a.patientId, a.employeeId);
  }

  async updateStatus(id: string, status: string): Promise<Appointment> {
    const a = await this.prisma.appointment.update({ where: { id }, data: { status } });
    return new Appointment(a.id, a.date, a.startTime, a.endTime, a.status, a.scheduleId, a.patientId, a.employeeId);
  }
} 