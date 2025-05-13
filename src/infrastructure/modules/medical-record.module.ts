import { Module } from '@nestjs/common';
import { MedicalRecordController } from '../controllers/medical-record.controller';
import { PrismaMedicalRecordRepository } from '../db/repositories/prisma-medical-record.repository';
import { MedicalRecordRepository } from '../../domain/repositories/medical-record.repository';
import { FinalizeAppointmentUseCase } from '../../use-case/appointment/finalize-appointment.usecase';
import { PrismaAppointmentRepository } from '../db/repositories/prisma-appointment.repository';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { PrismaModule } from './prisma.module';
import { MEDICAL_RECORD_REPOSITORY_TOKEN, APPOINTMENT_REPOSITORY_TOKEN } from '../constants/tokens.constants';

@Module({
  imports: [PrismaModule],
  controllers: [MedicalRecordController],
  providers: [
    PrismaMedicalRecordRepository,
    {
      provide: MEDICAL_RECORD_REPOSITORY_TOKEN,
      useClass: PrismaMedicalRecordRepository,
    },
    FinalizeAppointmentUseCase,
    PrismaAppointmentRepository,
    {
      provide: APPOINTMENT_REPOSITORY_TOKEN,
      useClass: PrismaAppointmentRepository,
    },
  ],
  exports: [
    MEDICAL_RECORD_REPOSITORY_TOKEN,
    APPOINTMENT_REPOSITORY_TOKEN,
    FinalizeAppointmentUseCase,
  ],
})
export class MedicalRecordModule {} 