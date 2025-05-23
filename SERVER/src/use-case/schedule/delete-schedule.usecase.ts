import { Injectable, NotFoundException } from '@nestjs/common';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';

@Injectable()
export class DeleteScheduleUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(id: string): Promise<void> {
    const schedule = await this.scheduleRepository.findById(id);

    if (!schedule) {
      throw new NotFoundException('Agenda não encontrada.');
    }

    await this.scheduleRepository.delete(id);
  }
} 