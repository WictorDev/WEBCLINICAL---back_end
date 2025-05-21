import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/services/prisma.service';
import { ScheduleRepository } from '../../../domain/repositories/schedule.repository';
import { Schedule } from '../../../domain/entities/schedule';

@Injectable()
export class PrismaScheduleRepository implements ScheduleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(schedule: Schedule): Promise<Schedule> {
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
    return new Schedule({
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

  async update(id: string, data: Partial<Schedule>): Promise<Schedule> {
    const updated = await this.prisma.schedule.update({
      where: { id },
      data,
    });
    return new Schedule({
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

  async delete(id: string): Promise<void> {
    await this.prisma.schedule.delete({ where: { id } });
  }

  async findById(id: string): Promise<Schedule | null> {
    const schedule = await this.prisma.schedule.findUnique({ where: { id } });
    if (!schedule) return null;
    return new Schedule({
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

  async findAll(): Promise<Schedule[]> {
    const schedules = await this.prisma.schedule.findMany();
    return schedules.map(s => new Schedule({
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

  async findByEmployeeId(employeeId: string): Promise<Schedule[]> {
    const schedules = await this.prisma.schedule.findMany({
      where: { employeeId },
    });
    return schedules.map(s => new Schedule({
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

  async findAvailableByEmployeeId(employeeId: string, active: true): Promise<Schedule[]> {
    const schedules = await this.prisma.schedule.findMany({
      where: { employeeId, active },
    });
    return schedules.map(s => new Schedule({
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

  async findByDate(employeeId: string, date: Date): Promise<Schedule[]> {
    const schedules = await this.prisma.schedule.findMany({
      where: { 
        employeeId,
        date: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(23, 59, 59, 999)),
        },
      },
    });
    return schedules.map(s => new Schedule({
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

  async findAvailableByDate(employeeId: string, date: Date, active: true): Promise<Schedule[]> {
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
    return schedules.map(s => new Schedule({
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
} 