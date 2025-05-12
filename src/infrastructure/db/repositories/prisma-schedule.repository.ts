import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/services/prisma.service';
import { ScheduleRepository } from '../../../domain/repositories/schedule.repository';
import { Schedule } from '../../../domain/entities/schedule';

@Injectable()
export class PrismaScheduleRepository implements ScheduleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAvailableByEmployee(employeeId: string, dayOfWeek: number): Promise<Schedule[]> {
    const schedules = await this.prisma.schedule.findMany({
      where: { employeeId, dayOfWeek },
    });
    return schedules.map(s => new Schedule(s.id, s.dayOfWeek, s.startTime, s.endTime, s.employeeId));
  }

  async create(schedule: Schedule): Promise<Schedule> {
    const s = await this.prisma.schedule.create({
      data: {
        id: schedule.id,
        dayOfWeek: schedule.dayOfWeek,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        employeeId: schedule.employeeId,
      },
    });
    return new Schedule(s.id, s.dayOfWeek, s.startTime, s.endTime, s.employeeId);
  }
} 