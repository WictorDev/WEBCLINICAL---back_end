import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Schedule } from '../../domain/entities/schedule';

@Injectable()
export class FindAllAvailableSchedulesUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(active: true): Promise<any[]> {
    const result = await this.scheduleRepository.findAllAvailable(active);
    return result;
  }
} 