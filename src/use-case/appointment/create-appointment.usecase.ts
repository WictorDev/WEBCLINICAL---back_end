import { Inject, Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment';
import { APPOINTMENT_REPOSITORY_TOKEN } from '../../infrastructure/constants/tokens.constants';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY_TOKEN)
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async execute(appointment: Appointment): Promise<Appointment> {
    // Validar formato de hora
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(appointment.startTime) || !timeRegex.test(appointment.endTime)) {
      throw new Error('Formato de hora inválido. Use o formato HH:mm.');
    }
    
    // Validação de conflito de horário
    const existing = await this.appointmentRepository.findByEmployee(
      appointment.employeeId,
      appointment.date
    );
    const conflict = existing.some(a =>
      a.startTime < appointment.endTime && appointment.startTime < a.endTime
    );
    if (conflict) {
      throw new Error('Conflito de horário para este funcionário.');
    }
    return this.appointmentRepository.create(appointment);
  }
} 