import { Injectable, ConflictException } from '@nestjs/common';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Schedule } from '../../domain/entities/schedule';
import { randomUUID } from 'crypto';
import { Appointment } from '../../domain/entities/appointment';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';

@Injectable()
export class CreateScheduleUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly appointmentRepository: AppointmentRepository
  ) {}

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
    endTime: string;
    employeeId: string;
    slotDuration: number;
  }): Promise<Schedule> {
    // Validação do formato de startTime e endTime
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(data.startTime) || !timeRegex.test(data.endTime)) {
      throw new ConflictException('Horário inválido. Use o formato HH:mm.');
    }

    // Busca agendas existentes para o mesmo funcionário na mesma data E que estejam ativas
    const existingSchedules = (await this.scheduleRepository.findByDate(data.employeeId, data.date))
      .filter(s => s.active);
    console.log('[CREATE SCHEDULE] Horários existentes ativos:', existingSchedules.map(s => ({ startTime: s.startTime, endTime: s.endTime })));

    // Verifica se há conflito de horário
    if (this.hasTimeConflict(existingSchedules, data.startTime, data.endTime)) {
      throw new ConflictException('Já existe uma agenda para este funcionário no mesmo horário');
    }

    // Criação da agenda
    const schedule = new Schedule({
      id: randomUUID(),
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      employeeId: data.employeeId,
      active: true
    });
    const createdSchedule = await this.scheduleRepository.create(schedule);

    // Gerar slots (appointments) automaticamente
    const [startHour, startMinute] = data.startTime.split(':').map(Number);
    const [endHour, endMinute] = data.endTime.split(':').map(Number);
    const start = new Date(data.date);
    start.setHours(startHour, startMinute, 0, 0);
    const end = new Date(data.date);
    end.setHours(endHour, endMinute, 0, 0);
    let slotStart = new Date(start);
    while (slotStart < end) {
      const slotEnd = new Date(slotStart.getTime() + data.slotDuration * 60000);
      if (slotEnd > end) break;
      await this.appointmentRepository.create(new Appointment({
        id: randomUUID(),
        date: schedule.date,
        startTime: slotStart.toTimeString().slice(0,5),
        endTime: slotEnd.toTimeString().slice(0,5),
        scheduleId: createdSchedule.id,
        employeeId: data.employeeId,
        status: 'disponivel',
        patientId: undefined
      }));
      slotStart = slotEnd;
    }

    return createdSchedule;
  }
} 