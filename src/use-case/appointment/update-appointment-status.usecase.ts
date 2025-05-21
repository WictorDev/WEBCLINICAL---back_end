import { Inject, Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment';
import { APPOINTMENT_REPOSITORY_TOKEN } from '../../infrastructure/constants/tokens.constants';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

@Injectable()
export class UpdateAppointmentStatusUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY_TOKEN)
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async execute(appointmentId: string, status: string): Promise<Appointment> {
    // Validação do status
    const validStatuses = ['PENDENTE', 'CONFIRMADO', 'FINALIZADO', 'CANCELADO'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Status inválido. Use um dos seguintes: ${validStatuses.join(', ')}`);
    }
    
    // Verificar se o agendamento existe
    const appointment = await this.appointmentRepository.findById(new UniqueEntityID(appointmentId));
    
    if (!appointment) {
      throw new Error('Agendamento não encontrado.');
    }
    
    // Validações específicas por status
    if (status === 'FINALIZADO' && appointment.status !== 'CONFIRMADO') {
      throw new Error('Apenas agendamentos confirmados podem ser finalizados.');
    }
    
    // Atualizar o status
    return this.appointmentRepository.updateStatus(new UniqueEntityID(appointmentId), status);
  }
} 