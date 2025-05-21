import { Injectable, Inject } from '@nestjs/common';
import { AppointmentRepository } from 'src/domain/repositories/appointment.repository';
import { Appointment } from 'src/domain/entities/appointment';
import { APPOINTMENT_REPOSITORY_TOKEN } from 'src/infrastructure/constants/tokens.constants';

@Injectable()
export class FindPatientAppointmentsUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY_TOKEN)
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async execute(patientId: string): Promise<Appointment[]> {
    return this.appointmentRepository.findByPatient(patientId);
  }
} 