import { Injectable, BadRequestException } from '@nestjs/common';
import { ScheduleRepository } from 'src/domain/repositories/schedule.repository';
import { Schedule } from 'src/domain/entities/schedule';

@Injectable()
export class CreateScheduleUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async execute(data: {
    date: Date;
    startTime: string;
    endTime: string;
    duration: number;
    totalSlots: number;
    availableSlots: number;
    employeeId: string;
    active: boolean;
  }) {
    const schedule = new Schedule({
      id: crypto.randomUUID(),
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      duration: data.duration,
      totalSlots: data.totalSlots,
      availableSlots: data.availableSlots,
      employeeId: data.employeeId,
      active: data.active
    });

    return await this.scheduleRepository.create(schedule);
  }
} 