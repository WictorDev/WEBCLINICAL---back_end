import { MedicalRecord } from '../entities/medical-record';
export declare abstract class MedicalRecordRepository {
    abstract findByAppointment(appointmentId: string): Promise<MedicalRecord | null>;
    abstract create(medicalRecord: MedicalRecord): Promise<MedicalRecord>;
}
