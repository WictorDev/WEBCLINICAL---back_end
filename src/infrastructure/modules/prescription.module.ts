import { Module } from '@nestjs/common';
import { PrescriptionController } from '../controllers/prescription.controller';
import { PrismaPrescriptionRepository } from '../db/repositories/prisma-prescription.repository';
import { PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { AddPrescriptionUseCase } from '../../use-case/medical-record/add-prescription.usecase';
import { PrismaModule } from './prisma.module';
import { PRESCRIPTION_REPOSITORY_TOKEN } from '../constants/tokens.constants';

@Module({
  imports: [PrismaModule],
  controllers: [PrescriptionController],
  providers: [
    PrismaPrescriptionRepository,
    {
      provide: PRESCRIPTION_REPOSITORY_TOKEN,
      useClass: PrismaPrescriptionRepository,
    },
    AddPrescriptionUseCase,
  ],
  exports: [PRESCRIPTION_REPOSITORY_TOKEN],
})
export class PrescriptionModule {} 