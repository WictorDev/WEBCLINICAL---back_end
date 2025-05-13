import { MedicalRecordRepository } from '../../domain/repositories/medical-record.repository';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { MedicalRecord } from '../../domain/entities/medical-record';
export declare class FinalizeAppointmentUseCase {
    private readonly medicalRecordRepository;
    private readonly appointmentRepository;
    constructor(medicalRecordRepository: MedicalRecordRepository, appointmentRepository: AppointmentRepository);
    execute(appointmentId: string, data: Omit<MedicalRecord, 'id' | 'createdAt'>): Promise<MedicalRecord>;
}
