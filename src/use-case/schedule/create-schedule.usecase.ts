import { Inject, Injectable } from '@nestjs/common';
import { Schedule } from '../../domain/entities/schedule';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { SCHEDULE_REPOSITORY_TOKEN } from '../../infrastructure/constants/tokens.constants';

@Injectable()
export class CreateScheduleUseCase {
  constructor(
    @Inject(SCHEDULE_REPOSITORY_TOKEN)
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async execute(schedule: Schedule): Promise<Schedule> {
    // Validar se o horário faz sentido (início antes do fim)
    if (schedule.startTime >= schedule.endTime) {
      throw new Error('O horário de início deve ser anterior ao horário de término.');
    }
    
    // Validar dia da semana (0-6)
    if (schedule.dayOfWeek < 0 || schedule.dayOfWeek > 6) {
      throw new Error('Dia da semana inválido. Deve ser entre 0 (Domingo) e 6 (Sábado).');
    }
    
    // Criar o agendamento
    return this.scheduleRepository.create(schedule);
  }
} 