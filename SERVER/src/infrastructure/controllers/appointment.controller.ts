import { Controller, Post, Body, Get, Query, UseGuards, Req } from '@nestjs/common';
import { CreateAppointmentUseCase } from '../../use-case/appointment/create-appointment.usecase';
import { FindEmployeeAppointmentsUseCase } from '../../use-case/appointment/find-employee-appointments.usecase';
import { Appointment } from '../../domain/entities/appointment';
import { AuthGuard } from '../auth/auth.guard';

@Controller('appointments')
@UseGuards(AuthGuard)
export class AppointmentController {
  constructor(
    private readonly createAppointment: CreateAppointmentUseCase,
    private readonly findEmployeeAppointments: FindEmployeeAppointmentsUseCase,
  ) {}

  @Post()
  async create(@Body() body: Appointment) {
    return this.createAppointment.execute(body);
  }

  @Get('employee')
  async getByEmployee(@Query('employeeId') employeeId: string, @Query('date') date?: string) {
    return this.findEmployeeAppointments.execute(employeeId, date ? new Date(date) : undefined);
  }
} 