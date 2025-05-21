import { Module } from '@nestjs/common';
import { PrescriptionController } from '../controllers/prescription.controller';
import { PrismaPrescriptionRepository } from '../db/repositories/prisma-prescription.repository';
import { PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { AddPrescriptionUseCase } from '../../use-case/medical-record/add-prescription.usecase';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PrescriptionController],
  providers: [
    {
      provide: PrescriptionRepository,
      useClass: PrismaPrescriptionRepository,
    },
    PrismaPrescriptionRepository,
    AddPrescriptionUseCase,
  ],
  exports: [
    PrescriptionRepository,
    PrismaPrescriptionRepository,
    AddPrescriptionUseCase,
  ],
})
export class PrescriptionModule {} 