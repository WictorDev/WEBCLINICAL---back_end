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
    totalSlots: number;
    employeeId: string;
  }): Promise<Schedule> {
    // Calcula o horário final baseado na duração e total de vagas
    const [hours, minutes] = data.startTime.split(':').map(Number);
    const startTimeInMinutes = hours * 60 + minutes;
    const totalDurationInMinutes = data.duration * data.totalSlots;
    const endTimeInMinutes = startTimeInMinutes + totalDurationInMinutes;
    
    const endHours = Math.floor(endTimeInMinutes / 60);
    const endMinutes = endTimeInMinutes % 60;
    const endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;

    // Busca agendas existentes para o mesmo funcionário na mesma data
    const existingSchedules = await this.scheduleRepository.findByDate(data.employeeId, data.date);

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
      totalSlots: data.totalSlots,
      availableSlots: data.totalSlots, // Inicialmente todas as vagas estão disponíveis
      employeeId: data.employeeId,
      active: true
    });

    return this.scheduleRepository.create(schedule);
  }
} 