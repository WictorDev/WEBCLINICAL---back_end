import { PrismaService } from '../../../core/services/prisma.service';
import { PrescriptionRepository } from '../../../domain/repositories/prescription.repository';
import { Prescription } from '../../../domain/entities/prescription';
export declare class PrismaPrescriptionRepository implements PrescriptionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByMedicalRecord(medicalRecordId: string): Promise<Prescription[]>;
    create(prescription: Prescription): Promise<Prescription>;
}
