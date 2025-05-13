import { Inject, Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Schedule } from '../../domain/entities/schedule';
import { SCHEDULE_REPOSITORY_TOKEN } from '../../infrastructure/constants/tokens.constants';

@Injectable()
export class FindAvailableSchedulesUseCase {
  constructor(
    @Inject(SCHEDULE_REPOSITORY_TOKEN)
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async execute(employeeId: string, dayOfWeek: number): Promise<Schedule[]> {
    if (dayOfWeek < 0 || dayOfWeek > 6) {
      throw new Error('Dia da semana inválido. Deve ser entre 0 (Domingo) e 6 (Sábado).');
    }
    return this.scheduleRepository.findAvailableByEmployee(employeeId, dayOfWeek);
  }
} 