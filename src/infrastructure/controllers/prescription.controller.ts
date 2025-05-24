import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { AddPrescriptionUseCase } from '../../use-case/medical-record/add-prescription.usecase';
import { PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { Prescription } from '../../domain/entities/prescription';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('prescriptions')
@Controller('/api/prescriptions')
@UseGuards(JwtAuthGuard)
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