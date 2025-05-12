import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment';

export class CreateAppointmentUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(appointment: Appointment): Promise<Appointment> {
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