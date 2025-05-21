import { Controller, Post, Body, Get, Query, UseGuards, Req, Param, Patch } from '@nestjs/common';
import { CreateAppointmentUseCase } from '../../use-case/appointment/create-appointment.usecase';
import { FindEmployeeAppointmentsUseCase } from '../../use-case/appointment/find-employee-appointments.usecase';
import { FinalizeAppointmentUseCase } from '../../use-case/appointment/finalize-appointment.usecase';
import { UpdateAppointmentStatusUseCase } from '../../use-case/appointment/update-appointment-status.usecase';
import { Appointment } from '../../domain/entities/appointment';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { randomUUID } from 'crypto';
import { MedicalRecord } from '../../domain/entities/medical-record';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentController {
  constructor(
    private readonly createAppointment: CreateAppointmentUseCase,
    private readonly findEmployeeAppointments: FindEmployeeAppointmentsUseCase,
    private readonly finalizeAppointment: FinalizeAppointmentUseCase,
    private readonly updateAppointmentStatus: UpdateAppointmentStatusUseCase,
  ) {}

  @Post()
  async create(@Body() body: Omit<Appointment, 'id'>) {
    const appointment = new Appointment({
      id: randomUUID(),
      date: new Date(body.date),
      startTime: body.startTime,
      endTime: body.endTime,
      status: body.status || 'PENDENTE',
      scheduleId: body.scheduleId,
      patientId: body.patientId,
      employeeId: body.employeeId
    });
    return this.createAppointment.execute(appointment);
  }

  @Get('employee')
  async getByEmployee(@Query('employeeId') employeeId: string, @Query('date') date?: string) {
    return this.findEmployeeAppointments.execute(employeeId, date ? new Date(date) : undefined);
  }
  
  @Patch(':id/finalize')
  async finalizeAppointmentRecord(
    @Param('id') id: string, 
    @Body() medicalRecordData: Omit<MedicalRecord, 'id' | 'createdAt'>
  ) {
    return this.finalizeAppointment.execute(id, medicalRecordData);
  }
  
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.updateAppointmentStatus.execute(id, body.status);
  }
} 