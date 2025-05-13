import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { AppointmentController } from '../controllers/appointment.controller';
import { PrismaAppointmentRepository } from '../db/repositories/prisma-appointment.repository';
import { CreateAppointmentUseCase } from '../../use-case/appointment/create-appointment.usecase';
import { FindEmployeeAppointmentsUseCase } from '../../use-case/appointment/find-employee-appointments.usecase';
import { UpdateAppointmentStatusUseCase } from '../../use-case/appointment/update-appointment-status.usecase';
import { APPOINTMENT_REPOSITORY_TOKEN } from '../constants/tokens.constants';
import { ScheduleModule } from './schedule.module';
import { MedicalRecordModule } from './medical-record.module';

@Module({
  imports: [
    PrismaModule, // fornece PrismaService
    ScheduleModule, // necessário para verificar disponibilidade
    MedicalRecordModule, // fornece o caso de uso FinalizeAppointmentUseCase
  ],
  controllers: [AppointmentController],
  providers: [
    {
      provide: APPOINTMENT_REPOSITORY_TOKEN,
      useClass: PrismaAppointmentRepository,
    },
    PrismaAppointmentRepository,
    CreateAppointmentUseCase,
    FindEmployeeAppointmentsUseCase,
    UpdateAppointmentStatusUseCase,
  ],
  exports: [
    APPOINTMENT_REPOSITORY_TOKEN,
    PrismaAppointmentRepository,
    CreateAppointmentUseCase,
    FindEmployeeAppointmentsUseCase,
    UpdateAppointmentStatusUseCase,
  ],
})
export class AppointmentModule {} 