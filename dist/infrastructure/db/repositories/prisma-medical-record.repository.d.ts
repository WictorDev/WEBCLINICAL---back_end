import { PrismaService } from '../../../core/services/prisma.service';
import { MedicalRecordRepository } from '../../../domain/repositories/medical-record.repository';
import { MedicalRecord } from '../../../domain/entities/medical-record';
export declare class PrismaMedicalRecordRepository implements MedicalRecordRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByAppointment(appointmentId: string): Promise<MedicalRecord | null>;
    create(medicalRecord: MedicalRecord): Promise<MedicalRecord>;
}
