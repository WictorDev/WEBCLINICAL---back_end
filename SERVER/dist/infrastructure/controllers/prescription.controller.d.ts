import { AddPrescriptionUseCase } from '../../use-case/medical-record/add-prescription.usecase';
import { PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { Prescription } from '../../domain/entities/prescription';
export declare class PrescriptionController {
    private readonly addPrescription;
    private readonly prescriptionRepository;
    constructor(addPrescription: AddPrescriptionUseCase, prescriptionRepository: PrescriptionRepository);
    add(body: {
        medicalRecordId: string;
        prescriptions: Omit<Prescription, 'id'>[];
    }): Promise<Prescription[]>;
    getByMedicalRecord(medicalRecordId: string): Promise<Prescription[]>;
}
