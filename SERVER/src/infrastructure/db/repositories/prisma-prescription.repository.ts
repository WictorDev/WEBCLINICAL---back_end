import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/services/prisma.service';
import { PrescriptionRepository } from '../../../domain/repositories/prescription.repository';
import { Prescription } from '../../../domain/entities/prescription';

@Injectable()
export class PrismaPrescriptionRepository implements PrescriptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByMedicalRecord(medicalRecordId: string): Promise<Prescription[]> {
    const prescriptions = await this.prisma.prescription.findMany({ where: { medicalRecordId } });
    return prescriptions.map(p => new Prescription(p.id, p.medication, p.dosage, p.instructions, p.medicalRecordId));
  }

  async create(prescription: Prescription): Promise<Prescription> {
    const p = await this.prisma.prescription.create({
      data: {
        id: prescription.id,
        medication: prescription.medication,
        dosage: prescription.dosage,
        instructions: prescription.instructions,
        medicalRecordId: prescription.medicalRecordId,
      },
    });
    return new Prescription(p.id, p.medication, p.dosage, p.instructions, p.medicalRecordId);
  }
} 