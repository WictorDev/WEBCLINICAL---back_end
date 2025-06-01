import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from 'src/domain/repositories/appointment.repository';
import { Appointment } from 'src/domain/entities/appointment';

@Injectable()
export class FindPatientAppointmentsUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async execute(patientId: string): Promise<Appointment[]> {
    return this.appointmentRepository.findByPatient(patientId);
  }
} 