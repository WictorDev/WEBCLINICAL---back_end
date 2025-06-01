import { PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { Prescription } from '../../domain/entities/prescription';

export class AddPrescriptionUseCase {
  constructor(private readonly prescriptionRepository: PrescriptionRepository) {}

  async execute(medicalRecordId: string, prescriptions: Omit<Prescription, 'id'>[]): Promise<Prescription[]> {
    const created: Prescription[] = [];
    for (const p of prescriptions) {
      const prescription = await this.prescriptionRepository.create({
        ...p,
        id: '', // será gerado pelo banco
        medicalRecordId,
      } as Prescription);
      created.push(prescription);
    }
    return created;
  }
} 