import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment';

@Injectable()
export class UpdateAppointmentPatientUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(id: string, patientId: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    appointment.patientId = patientId;
    return this.appointmentRepository.update(id, { patientId });
  }
} 