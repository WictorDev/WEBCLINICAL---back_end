import { Injectable, BadRequestException } from '@nestjs/common';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Appointment } from '../../domain/entities/appointment';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async execute(appointment: Appointment): Promise<Appointment> {
    // Validar formato de hora
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(appointment.startTime) || !timeRegex.test(appointment.endTime)) {
      throw new BadRequestException('Formato de hora inválido. Use o formato HH:mm.');
    }

    // Buscar a agenda
    const schedule = await this.scheduleRepository.findById(appointment.scheduleId);
    if (!schedule) {
      throw new BadRequestException('Agenda não encontrada.');
    }

    // Verificar se há vagas disponíveis
    if (schedule.availableSlots <= 0) {
      throw new BadRequestException('Não há vagas disponíveis nesta agenda.');
    }

    // Verificar se o horário está dentro do horário da agenda
    if (appointment.startTime < schedule.startTime || appointment.endTime > schedule.endTime) {
      throw new BadRequestException('Horário fora do período da agenda.');
    }

    // Verificar conflito de horário
    const existing = await this.appointmentRepository.findByEmployee(
      appointment.employeeId,
      appointment.date
    );
    const conflict = existing.some(a =>
      a.startTime < appointment.endTime && appointment.startTime < a.endTime
    );
    if (conflict) {
      throw new BadRequestException('Conflito de horário para este funcionário.');
    }

    // Criar o agendamento
    const newAppointment = await this.appointmentRepository.create(appointment);

    // Atualizar a quantidade de vagas disponíveis
    await this.scheduleRepository.update(schedule.id, {
      availableSlots: schedule.availableSlots - 1
    });

    return newAppointment;
  }
} 