// app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/infrastructure/modules/auth.module';
import { UserModule } from 'src/infrastructure/modules/user.module';
import { PrismaModule } from 'src/infrastructure/modules/prisma.module'; // <-- o caminho certo
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from 'src/infrastructure/modules/company.module';
import { TypeModule } from 'src/infrastructure/modules/type.module';
import { EmployeeModule } from 'src/infrastructure/modules/employee.module';
import { EmployeeTypeModule } from 'src/infrastructure/modules/employee-type.module';
import { PatientModule } from 'src/infrastructure/modules/patient.module';
import { ScheduleController } from '../controllers/schedule.controller';
import { AppointmentController } from '../controllers/appointment.controller';
import { MedicalRecordController } from '../controllers/medical-record.controller';
import { PrescriptionController } from '../controllers/prescription.controller';
import { PrismaScheduleRepository } from '../db/repositories/prisma-schedule.repository';
import { PrismaAppointmentRepository } from '../db/repositories/prisma-appointment.repository';
import { PrismaMedicalRecordRepository } from '../db/repositories/prisma-medical-record.repository';
import { PrismaPrescriptionRepository } from '../db/repositories/prisma-prescription.repository';
import { FindAvailableSchedulesUseCase } from '../../use-case/schedule/find-available-schedules.usecase';
import { CreateAppointmentUseCase } from '../../use-case/appointment/create-appointment.usecase';
import { FindEmployeeAppointmentsUseCase } from '../../use-case/appointment/find-employee-appointments.usecase';
import { FinalizeAppointmentUseCase } from '../../use-case/appointment/finalize-appointment.usecase';
import { AddPrescriptionUseCase } from '../../use-case/medical-record/add-prescription.usecase';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, 
    AuthModule,
    UserModule,
    CompanyModule,
    TypeModule,
    EmployeeTypeModule,
    EmployeeModule,
    PatientModule,
  ],
  controllers: [
    ScheduleController,
    AppointmentController,
    MedicalRecordController,
    PrescriptionController,
  ],
  providers: [
    PrismaScheduleRepository,
    PrismaAppointmentRepository,
    PrismaMedicalRecordRepository,
    PrismaPrescriptionRepository,
    FindAvailableSchedulesUseCase,
    CreateAppointmentUseCase,
    FindEmployeeAppointmentsUseCase,
    FinalizeAppointmentUseCase,
    AddPrescriptionUseCase,
  ],
})
export class AppModule {}
