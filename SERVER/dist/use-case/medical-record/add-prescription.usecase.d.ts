import { PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { Prescription } from '../../domain/entities/prescription';
export declare class AddPrescriptionUseCase {
    private readonly prescriptionRepository;
    constructor(prescriptionRepository: PrescriptionRepository);
    execute(medicalRecordId: string, prescriptions: Omit<Prescription, 'id'>[]): Promise<Prescription[]>;
}
