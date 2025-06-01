import { Module } from '@nestjs/common';
import { MedicalRecordController } from '../controllers/medical-record.controller';
import { PrismaMedicalRecordRepository } from '../db/repositories/prisma-medical-record.repository';
import { MedicalRecordRepository } from '../../domain/repositories/medical-record.repository';
import { FinalizeAppointmentUseCase } from '../../use-case/appointment/finalize-appointment.usecase';
import { PrismaAppointmentRepository } from '../db/repositories/prisma-appointment.repository';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { AddPrescriptionUseCase } from '../../use-case/medical-record/add-prescription.usecase';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MedicalRecordController],
  providers: [
    {
      provide: MedicalRecordRepository,
      useClass: PrismaMedicalRecordRepository,
    },
    PrismaMedicalRecordRepository,
    FinalizeAppointmentUseCase,
    {
      provide: AppointmentRepository,
      useClass: PrismaAppointmentRepository,
    },
    PrismaAppointmentRepository,
    AddPrescriptionUseCase,
  ],
  exports: [
    MedicalRecordRepository,
    PrismaMedicalRecordRepository,
    AppointmentRepository,
    PrismaAppointmentRepository,
    FinalizeAppointmentUseCase,
    AddPrescriptionUseCase,
  ],
})
export class MedicalRecordModule {} 