import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Schedule } from '../../domain/entities/schedule';

@Injectable()
export class FindAvailableSchedulesUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(employeeId: string, date?: Date): Promise<Schedule[]> {
    if (date) {
      return this.scheduleRepository.findAvailableByDate(employeeId, date, true);
    }
    return this.scheduleRepository.findAvailableByEmployeeId(employeeId, true);
  }
} 