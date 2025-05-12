import { MedicalRecordRepository } from '../../domain/repositories/medical-record.repository';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { MedicalRecord } from '../../domain/entities/medical-record';

export class FinalizeAppointmentUseCase {
  constructor(
    private readonly medicalRecordRepository: MedicalRecordRepository,
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async execute(appointmentId: string, data: Omit<MedicalRecord, 'id' | 'createdAt'>): Promise<MedicalRecord> {
    // Atualiza status do agendamento para FINALIZADO
    await this.appointmentRepository.updateStatus(appointmentId, 'FINALIZADO');
    // Cria o prontuário
    const record = await this.medicalRecordRepository.create({
      ...data,
      id: '', // será gerado pelo banco
      createdAt: new Date(),
    } as MedicalRecord);
    return record;
  }
} 