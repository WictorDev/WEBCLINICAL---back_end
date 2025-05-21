import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/modules/prisma.module';
import { PatientController } from '../controllers/patient.controller';
import { PrismaPatientRepository } from '../db/repositories/prisma-patient.repository';
import { CreatePatientUseCase } from 'src/use-case/patient/create-patient.usecase';
import { FindPatientUseCase } from 'src/use-case/patient/find-patient.usecase';
import { FindPatientByCpfUseCase } from 'src/use-case/patient/find-patient-by-cpf.usecase';
import { FindPatientByEmailUseCase } from 'src/use-case/patient/find-patient-by-email.usecase';
import { UpdatePatientUseCase } from 'src/use-case/patient/update-patient.usecase';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { TypeModule } from './type.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';

@Module({
  imports: [
    PrismaModule,
    TypeModule,
    JwtModule,
    forwardRef(() => UserModule)
  ],
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
    UpdatePatientUseCase,
  ],
  exports: [
    PatientRepository,
    PrismaPatientRepository,
    CreatePatientUseCase,
    FindPatientUseCase,
    FindPatientByCpfUseCase,
    FindPatientByEmailUseCase,
    UpdatePatientUseCase,
  ],
})
export class PatientModule {} 