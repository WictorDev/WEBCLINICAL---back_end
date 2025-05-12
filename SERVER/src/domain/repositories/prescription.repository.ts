import { Prescription } from '../entities/prescription';

export interface PrescriptionRepository {
  findByMedicalRecord(medicalRecordId: string): Promise<Prescription[]>;
  create(prescription: Prescription): Promise<Prescription>;
  // outros métodos necessários...
} 