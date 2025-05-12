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
    return new MedicalRecord(record.id, record.symptoms, record.diagnosis, record.conduct, record.createdAt, record.appointmentId);
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
    return new MedicalRecord(r.id, r.symptoms, r.diagnosis, r.conduct, r.createdAt, r.appointmentId);
  }
} 