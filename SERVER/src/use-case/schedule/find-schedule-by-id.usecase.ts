import { Injectable, NotFoundException } from '@nestjs/common';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Schedule } from '../../domain/entities/schedule';

@Injectable()
export class FindScheduleByIdUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(id: string): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findById(id);

    if (!schedule) {
      throw new NotFoundException('Agenda não encontrada.');
    }

    return schedule;
  }
} 