import { Injectable, Inject } from '@nestjs/common';
import { AppointmentRepository } from 'src/domain/repositories/appointment.repository';
import { Appointment } from 'src/domain/entities/appointment';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { APPOINTMENT_REPOSITORY_TOKEN } from 'src/infrastructure/constants/tokens.constants';

@Injectable()
export class UpdateAppointmentUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY_TOKEN)
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async execute(id: UniqueEntityID, data: Partial<Appointment>): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new Error('Agendamento não encontrado.');
    }

    return this.appointmentRepository.update(id, data);
  }
} 