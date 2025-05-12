import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { FinalizeAppointmentUseCase } from '../../use-case/appointment/finalize-appointment.usecase';
import { MedicalRecordRepository } from '../../domain/repositories/medical-record.repository';
import { MedicalRecord } from '../../domain/entities/medical-record';
import { AuthGuard } from '../auth/auth.guard';

@Controller('medical-records')
@UseGuards(AuthGuard)
export class MedicalRecordController {
  constructor(
    private readonly finalizeAppointment: FinalizeAppointmentUseCase,
    private readonly medicalRecordRepository: MedicalRecordRepository,
  ) {}

  @Post('finalize')
  async finalize(@Body() body: { appointmentId: string, symptoms: string, diagnosis: string, conduct: string }) {
    return this.finalizeAppointment.execute(body.appointmentId, {
      symptoms: body.symptoms,
      diagnosis: body.diagnosis,
      conduct: body.conduct,
      appointmentId: body.appointmentId,
    } as any);
  }

  @Get()
  async getByAppointment(@Query('appointmentId') appointmentId: string) {
    return this.medicalRecordRepository.findByAppointment(appointmentId);
  }
} 