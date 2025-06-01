import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { AppointmentController } from '../controllers/appointment.controller';
import { PrismaAppointmentRepository } from '../db/repositories/prisma-appointment.repository';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { CreateAppointmentUseCase } from '../../use-case/appointment/create-appointment.usecase';
import { CancelAppointmentUseCase } from '../../use-case/appointment/cancel-appointment.usecase';
import { UpdateAppointmentStatusUseCase } from '../../use-case/appointment/update-appointment-status.usecase';
import { FinalizeAppointmentUseCase } from '../../use-case/appointment/finalize-appointment.usecase';
import { FindEmployeeAppointmentsUseCase } from '../../use-case/appointment/find-employee-appointments.usecase';
import { FindPatientAppointmentsUseCase } from '../../use-case/appointment/find-patient-appointments.usecase';
import { UpdateAppointmentPatientUseCase } from '../../use-case/appointment/update-appointment-patient.usecase';
import { ScheduleModule } from './schedule.module';
import { MedicalRecordModule } from './medical-record.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => ScheduleModule),
    MedicalRecordModule,
  ],
  controllers: [AppointmentController],
  providers: [
    {
      provide: AppointmentRepository,
      useClass: PrismaAppointmentRepository,
    },
    PrismaAppointmentRepository,
    CreateAppointmentUseCase,
    CancelAppointmentUseCase,
    UpdateAppointmentStatusUseCase,
    FinalizeAppointmentUseCase,
    FindEmployeeAppointmentsUseCase,
    FindPatientAppointmentsUseCase,
    UpdateAppointmentPatientUseCase,
  ],
  exports: [
    AppointmentRepository,
    PrismaAppointmentRepository,
    CreateAppointmentUseCase,
    CancelAppointmentUseCase,
    UpdateAppointmentStatusUseCase,
    FinalizeAppointmentUseCase,
    FindEmployeeAppointmentsUseCase,
    FindPatientAppointmentsUseCase,
    UpdateAppointmentPatientUseCase,
  ],
})
export class AppointmentModule {} 