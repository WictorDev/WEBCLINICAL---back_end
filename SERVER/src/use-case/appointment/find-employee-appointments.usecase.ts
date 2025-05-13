import { Inject, Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment';
import { APPOINTMENT_REPOSITORY_TOKEN } from '../../infrastructure/constants/tokens.constants';

@Injectable()
export class FindEmployeeAppointmentsUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY_TOKEN)
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async execute(employeeId: string, date?: Date): Promise<Appointment[]> {
    return this.appointmentRepository.findByEmployee(employeeId, date);
  }
} 