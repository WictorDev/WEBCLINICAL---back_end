import { Prescription } from '../entities/prescription';

export abstract class PrescriptionRepository {
  abstract findByMedicalRecord(medicalRecordId: string): Promise<Prescription[]>;
  abstract create(prescription: Prescription): Promise<Prescription>;
  // outros métodos necessários...
} 