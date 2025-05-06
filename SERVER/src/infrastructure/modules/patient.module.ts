import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/modules/prisma.module';
import { PatientController } from '../controllers/patient.controller';
import { PrismaPatientRepository } from '../db/repositories/prisma-patient.repository';
import { CreatePatientUseCase } from 'src/use-case/patient/create-patient.usecase';
import { FindPatientUseCase } from 'src/use-case/patient/find-patient.usecase';
import { FindPatientByCpfUseCase } from 'src/use-case/patient/find-patient-by-cpf.usecase';
import { FindPatientByEmailUseCase } from 'src/use-case/patient/find-patient-by-email.usecase';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { TypeModule } from './type.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, TypeModule, JwtModule],
  controllers: [PatientController],
  providers: [
    {
      provide: PatientRepository,
      useClass: PrismaPatientRepository,
    },
    PrismaPatientRepository,
    CreatePatientUseCase,
    FindPatientUseCase,
    FindPatientByCpfUseCase,
    FindPatientByEmailUseCase,
  ],
  exports: [
    PatientRepository,
    PrismaPatientRepository,
    CreatePatientUseCase,
    FindPatientUseCase,
    FindPatientByCpfUseCase,
    FindPatientByEmailUseCase,
  ],
})
export class PatientModule {} 