import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { FinalizeAppointmentUseCase } from '../../use-case/appointment/finalize-appointment.usecase';
import { MedicalRecordRepository } from '../../domain/repositories/medical-record.repository';
import { MedicalRecord } from '../../domain/entities/medical-record';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

@ApiTags('medical-records')
@Controller('/api/medical-records')
@UseGuards(JwtAuthGuard)
export class MedicalRecordController {
  constructor(
    private readonly finalizeAppointment: FinalizeAppointmentUseCase,
    private readonly medicalRecordRepository: MedicalRecordRepository,
  ) {}

  @Post('finalize')
  async finalize(@Body() body: { appointmentId: string, symptoms: string, diagnosis: string, conduct: string }) {
    const medicalRecord = new MedicalRecord({
      id: randomUUID(),
      symptoms: body.symptoms,
      diagnosis: body.diagnosis,
      conduct: body.conduct,
      appointmentId: body.appointmentId,
      createdAt: new Date(),
    });

    return this.finalizeAppointment.execute(body.appointmentId, medicalRecord);
  }

  @Get()
  async getByAppointment(@Query('appointmentId') appointmentId: string) {
    return this.medicalRecordRepository.findByAppointment(appointmentId);
  }
} 