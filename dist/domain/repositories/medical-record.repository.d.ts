import { MedicalRecord } from '../entities/medical-record';
export interface MedicalRecordRepository {
    findByAppointment(appointmentId: string): Promise<MedicalRecord | null>;
    create(medicalRecord: MedicalRecord): Promise<MedicalRecord>;
}
