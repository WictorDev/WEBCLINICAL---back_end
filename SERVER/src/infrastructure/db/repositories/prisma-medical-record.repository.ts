import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/services/prisma.service';
import { MedicalRecordRepository } from '../../../domain/repositories/medical-record.repository';
import { MedicalRecord } from '../../../domain/entities/medical-record';

@Injectable()
export class PrismaMedicalRecordRepository implements MedicalRecordRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByAppointment(appointmentId: string): Promise<MedicalRecord | null> {
    const record = await this.prisma.medicalRecord.findUnique({ where: { appointmentId } });
    if (!record) return null;
    return new MedicalRecord({
      id: record.id,
      symptoms: record.symptoms,
      diagnosis: record.diagnosis,
      conduct: record.conduct,
      createdAt: record.createdAt,
      appointmentId: record.appointmentId
    });
  }

  async create(medicalRecord: MedicalRecord): Promise<MedicalRecord> {
    const r = await this.prisma.medicalRecord.create({
      data: {
        id: medicalRecord.id,
        symptoms: medicalRecord.symptoms,
        diagnosis: medicalRecord.diagnosis,
        conduct: medicalRecord.conduct,
        createdAt: medicalRecord.createdAt,
        appointmentId: medicalRecord.appointmentId,
      },
    });
    return new MedicalRecord({
      id: r.id,
      symptoms: r.symptoms,
      diagnosis: r.diagnosis,
      conduct: r.conduct,
      createdAt: r.createdAt,
      appointmentId: r.appointmentId
    });
  }
} 