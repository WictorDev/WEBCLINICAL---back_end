import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from 'src/domain/repositories/schedule.repository';

@Injectable()
export class FindScheduleByIdUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async execute(id: string) {
    return await this.scheduleRepository.findById(id);
  }
} 