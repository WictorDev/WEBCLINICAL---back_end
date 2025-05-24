import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/services/prisma.service';
import { ScheduleRepository } from '../../../domain/repositories/schedule.repository';
import { Schedule } from '../../../domain/entities/schedule';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaScheduleRepository implements ScheduleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(schedule: Schedule): Promise<Schedule> {
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

      return new Schedule({
        id: created.id,
        date: created.date,
        startTime: created.startTime,
        endTime: created.endTime,
        duration: created.duration,
        employeeId: created.employeeId,
        appointmentId: created.appointmentId || undefined,
        active: created.active
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Já existe uma agenda para este horário.');
        }
      }
      throw error;
    }
  }

  async update(id: string, data: Partial<Schedule>): Promise<Schedule> {
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

      return new Schedule({
        id: updated.id,
        date: updated.date,
        startTime: updated.startTime,
        endTime: updated.endTime,
        duration: updated.duration,
        appointmentId: updated.appointmentId || undefined,
        employeeId: updated.employeeId,
        active: updated.active
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Agenda não encontrada.');
        }
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.schedule.delete({
        where: { id }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Agenda não encontrada.');
        }
      }
      throw error;
    }
  }

  async findById(id: string): Promise<Schedule | null> {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id }
    });

    if (!schedule) return null;

    return new Schedule({
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

  async findAll(): Promise<Schedule[]> {
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

    return schedules.map(schedule => new Schedule({
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

  async findByEmployeeId(employeeId: string): Promise<Schedule[]> {
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

    return schedules.map(schedule => new Schedule({
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

  async findAvailableByEmployeeId(employeeId: string, active: true): Promise<Schedule[]> {
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

    return schedules.map(schedule => new Schedule({
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

  async findByDate(employeeId: string, date: Date): Promise<Schedule[]> {
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

    return schedules.map(schedule => new Schedule({
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

  async findAvailableByDate(employeeId: string, date: Date, active: true): Promise<Schedule[]> {
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

    return schedules.map(schedule => new Schedule({
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
}
