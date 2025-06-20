import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment, AppointmentStatus } from '../../domain/entities/appointment';

@Injectable()
export class UpdateAppointmentStatusUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async execute(appointmentId: string, status: AppointmentStatus): Promise<Appointment> {
    // Verificar se o agendamento existe
    const appointment = await this.appointmentRepository.findById(appointmentId);
    
    if (!appointment) {
      throw new Error('Agendamento não encontrado.');
    }
    
    // Validações específicas por status
    if (status === AppointmentStatus.FINISHED && appointment.status !== AppointmentStatus.SCHEDULED) {
      throw new Error('Apenas agendamentos agendados podem ser finalizados.');
    }
    
    // Atualizar o status
    return this.appointmentRepository.updateStatus(appointmentId, status);
  }
} 