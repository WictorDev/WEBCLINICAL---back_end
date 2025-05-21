import { Injectable, BadRequestException } from '@nestjs/common';
import { ScheduleRepository } from 'src/domain/repositories/schedule.repository';

@Injectable()
export class DeleteScheduleUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async execute(id: string) {
    const schedule = await this.scheduleRepository.findById(id);
    if (!schedule) {
      throw new BadRequestException('Agenda não encontrada.');
    }

    await this.scheduleRepository.delete(id);
  }
} 