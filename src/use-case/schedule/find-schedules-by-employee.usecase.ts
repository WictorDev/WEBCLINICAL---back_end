import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Schedule } from '../../domain/entities/schedule';

@Injectable()
export class FindSchedulesByEmployeeUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(employeeId: string, date?: Date): Promise<Schedule[]> {
    if (date) {
      return this.scheduleRepository.findByDate(employeeId, date);
    }
    return this.scheduleRepository.findByEmployeeId(employeeId);
  }
} 