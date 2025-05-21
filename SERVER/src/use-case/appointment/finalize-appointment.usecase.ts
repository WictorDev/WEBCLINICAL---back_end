import { Inject, Injectable } from '@nestjs/common';
import { MedicalRecordRepository } from '../../domain/repositories/medical-record.repository';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { MedicalRecord } from '../../domain/entities/medical-record';
import { APPOINTMENT_REPOSITORY_TOKEN, MEDICAL_RECORD_REPOSITORY_TOKEN } from '../../infrastructure/constants/tokens.constants';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

@Injectable()
export class FinalizeAppointmentUseCase {
  constructor(
    @Inject(MEDICAL_RECORD_REPOSITORY_TOKEN)
    private readonly medicalRecordRepository: MedicalRecordRepository,
    @Inject(APPOINTMENT_REPOSITORY_TOKEN)
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async execute(appointmentId: string, data: Omit<MedicalRecord, 'id' | 'createdAt'>): Promise<MedicalRecord> {
    // Verificar se o agendamento pode ser finalizado
    const appointment = await this.appointmentRepository.findById(new UniqueEntityID(appointmentId));
    
    if (!appointment) {
      throw new Error('Agendamento não encontrado.');
    }
    
    if (appointment.status !== 'CONFIRMADO') {
      throw new Error('Apenas agendamentos confirmados podem ser finalizados.');
    }

    // Finalizar o agendamento
    await this.appointmentRepository.updateStatus(new UniqueEntityID(appointmentId), 'FINALIZADO');
    // Cria o prontuário
    const record = await this.medicalRecordRepository.create({
      ...data,
      id: '', // será gerado pelo banco
      createdAt: new Date(),
    } as MedicalRecord);
    return record;
  }
} 