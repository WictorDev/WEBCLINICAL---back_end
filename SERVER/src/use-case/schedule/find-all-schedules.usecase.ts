import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from 'src/domain/repositories/schedule.repository';

@Injectable()
export class FindAllSchedulesUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async execute() {
    return await this.scheduleRepository.findAll();
  }
} 