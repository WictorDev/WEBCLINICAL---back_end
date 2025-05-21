import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/services/prisma.service';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { Appointment } from '../../../domain/entities/appointment';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: UniqueEntityID): Promise<Appointment | null> {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: id.toString() }
    });

    if (!appointment) return null;

    return new Appointment({
      id: appointment.id,
      date: appointment.date,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      status: appointment.status,
      scheduleId: appointment.scheduleId,
      patientId: appointment.patientId,
      employeeId: appointment.employeeId
    });
  }

  async update(id: UniqueEntityID, data: Partial<Appointment>): Promise<Appointment> {
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

    return new Appointment({
      id: updated.id,
      date: updated.date,
      startTime: updated.startTime,
      endTime: updated.endTime,
      status: updated.status,
      scheduleId: updated.scheduleId,
      patientId: updated.patientId,
      employeeId: updated.employeeId
    });
  }

  async findByPatient(patientId: string): Promise<Appointment[]> {
    const appointments = await this.prisma.appointment.findMany({
      where: { patientId }
    });

    return appointments.map(appointment => new Appointment({
      id: appointment.id,
      date: appointment.date,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      status: appointment.status,
      scheduleId: appointment.scheduleId,
      patientId: appointment.patientId,
      employeeId: appointment.employeeId
    }));
  }

  async findByEmployee(employeeId: string, date?: Date): Promise<Appointment[]> {
    const where = date ? {
      employeeId,
      date: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999))
      }
    } : { employeeId };

    const appointments = await this.prisma.appointment.findMany({ where });

    return appointments.map(appointment => new Appointment({
      id: appointment.id,
      date: appointment.date,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      status: appointment.status,
      scheduleId: appointment.scheduleId,
      patientId: appointment.patientId,
      employeeId: appointment.employeeId
    }));
  }

  async create(appointment: Appointment): Promise<Appointment> {
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

    return new Appointment({
      id: created.id,
      date: created.date,
      startTime: created.startTime,
      endTime: created.endTime,
      status: created.status,
      scheduleId: created.scheduleId,
      patientId: created.patientId,
      employeeId: created.employeeId
    });
  }

  async updateStatus(id: UniqueEntityID, status: string): Promise<Appointment> {
    const updated = await this.prisma.appointment.update({
      where: { id: id.toString() },
      data: { status }
    });

    return new Appointment({
      id: updated.id,
      date: updated.date,
      startTime: updated.startTime,
      endTime: updated.endTime,
      status: updated.status,
      scheduleId: updated.scheduleId,
      patientId: updated.patientId,
      employeeId: updated.employeeId
    });
  }
} 