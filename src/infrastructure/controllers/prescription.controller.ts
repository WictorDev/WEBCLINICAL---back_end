import { Controller, Post, Body, Get, Query, UseGuards, Inject } from '@nestjs/common';
import { AddPrescriptionUseCase } from '../../use-case/medical-record/add-prescription.usecase';
import { PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { Prescription } from '../../domain/entities/prescription';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PRESCRIPTION_REPOSITORY_TOKEN } from '../constants/tokens.constants';

@Controller('prescriptions')
@UseGuards(JwtAuthGuard)
export class PrescriptionController {
  constructor(
    private readonly addPrescription: AddPrescriptionUseCase,
    @Inject(PRESCRIPTION_REPOSITORY_TOKEN)
    private readonly prescriptionRepository: PrescriptionRepository,
  ) {}

  @Post()
  async add(@Body() body: { medicalRecordId: string, prescriptions: Omit<Prescription, 'id'>[] }) {
    return this.addPrescription.execute(body.medicalRecordId, body.prescriptions);
  }

  @Get()
  async getByMedicalRecord(@Query('medicalRecordId') medicalRecordId: string) {
    return this.prescriptionRepository.findByMedicalRecord(medicalRecordId);
  }
} 