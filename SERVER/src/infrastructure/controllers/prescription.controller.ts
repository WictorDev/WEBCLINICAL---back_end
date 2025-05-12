import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { AddPrescriptionUseCase } from '../../use-case/medical-record/add-prescription.usecase';
import { PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { Prescription } from '../../domain/entities/prescription';
import { AuthGuard } from '../auth/auth.guard';

@Controller('prescriptions')
@UseGuards(AuthGuard)
export class PrescriptionController {
  constructor(
    private readonly addPrescription: AddPrescriptionUseCase,
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