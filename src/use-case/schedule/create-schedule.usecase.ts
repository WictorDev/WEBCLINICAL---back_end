import { Injectable, ConflictException } from '@nestjs/common';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Schedule } from '../../domain/entities/schedule';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateScheduleUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  private hasTimeConflict(existingSchedules: Schedule[], newStartTime: string, newEndTime: string): boolean {
    return existingSchedules.some(schedule => {
      // Converte os horários para minutos para facilitar a comparação
      const [newStartHours, newStartMinutes] = newStartTime.split(':').map(Number);
      const [newEndHours, newEndMinutes] = newEndTime.split(':').map(Number);
      const [existingStartHours, existingStartMinutes] = schedule.startTime.split(':').map(Number);
      const [existingEndHours, existingEndMinutes] = schedule.endTime.split(':').map(Number);

      const newStartInMinutes = newStartHours * 60 + newStartMinutes;
      const newEndInMinutes = newEndHours * 60 + newEndMinutes;
      const existingStartInMinutes = existingStartHours * 60 + existingStartMinutes;
      const existingEndInMinutes = existingEndHours * 60 + existingEndMinutes;

      // Verifica se há sobreposição de horários
      return (
        (newStartInMinutes >= existingStartInMinutes && newStartInMinutes < existingEndInMinutes) || // Novo início dentro do horário existente
        (newEndInMinutes > existingStartInMinutes && newEndInMinutes <= existingEndInMinutes) || // Novo fim dentro do horário existente
        (newStartInMinutes <= existingStartInMinutes && newEndInMinutes >= existingEndInMinutes) // Novo horário engloba o existente
      );
    });
  }

  async execute(data: {
    date: Date;
    startTime: string;
    duration: number;
    employeeId: string;
  }): Promise<Schedule> {
    // Validação do formato de startTime
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(data.startTime)) {
      throw new ConflictException('Horário de início inválido. Use o formato HH:mm.');
    }

    // Cria um objeto Date com a data e o horário de início (UTC)
    const [hours, minutes] = data.startTime.split(':').map(Number);
    const startDate = new Date(data.date);
    startDate.setUTCHours(hours, minutes, 0, 0);
    console.log('[CREATE SCHEDULE] Recebido:', { data });

    // Soma a duração em minutos
    const endDate = new Date(startDate.getTime() + data.duration * 60000);

    // Formata o horário final para HH:mm
    const endHours = String(endDate.getUTCHours()).padStart(2, '0');
    const endMinutes = String(endDate.getUTCMinutes()).padStart(2, '0');
    const endTime = `${endHours}:${endMinutes}`;
    console.log('[CREATE SCHEDULE] Calculado endTime:', endTime);

    // Busca agendas existentes para o mesmo funcionário na mesma data E que estejam ativas
    const existingSchedules = (await this.scheduleRepository.findByDate(data.employeeId, data.date))
      .filter(s => s.active);
    console.log('[CREATE SCHEDULE] Horários existentes ativos:', existingSchedules.map(s => ({ startTime: s.startTime, endTime: s.endTime })));

    // Verifica se há conflito de horário
    if (this.hasTimeConflict(existingSchedules, data.startTime, endTime)) {
      throw new ConflictException('Já existe uma agenda para este funcionário no mesmo horário');
    }

    const schedule = new Schedule({
      id: randomUUID(),
      date: data.date,
      startTime: data.startTime,
      endTime,
      duration: Number(data.duration),
      employeeId: data.employeeId,
      active: true
    });
    console.log('[CREATE SCHEDULE] Agenda criada:', {
      startTime: data.startTime,
      endTime,
      duration: data.duration,
      employeeId: data.employeeId
    });

    return this.scheduleRepository.create(schedule);
  }
} 