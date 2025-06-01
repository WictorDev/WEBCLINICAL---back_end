import { MedicalRecord } from '../entities/medical-record';

export abstract class MedicalRecordRepository {
  abstract findByAppointment(appointmentId: string): Promise<MedicalRecord | null>;
  abstract create(medicalRecord: MedicalRecord): Promise<MedicalRecord>;
  // outros métodos necessários...
} 