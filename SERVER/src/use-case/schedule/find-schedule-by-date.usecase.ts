import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from 'src/domain/repositories/schedule.repository';

@Injectable()
export class FindScheduleByDateUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async findByDate(employeeId: string, date: Date) {
    return await this.scheduleRepository.findByDate(employeeId, date);
  }

  async findAvailableByDate(employeeId: string, date: Date, active = true as const) {
    return await this.scheduleRepository.findAvailableByDate(employeeId, date, active);
  }
} 