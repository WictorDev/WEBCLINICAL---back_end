import { Prescription } from '../entities/prescription';
export declare abstract class PrescriptionRepository {
    abstract findByMedicalRecord(medicalRecordId: string): Promise<Prescription[]>;
    abstract create(prescription: Prescription): Promise<Prescription>;
}
