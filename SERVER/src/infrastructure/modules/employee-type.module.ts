import { Module } from '@nestjs/common';
import { PrismaEmployeeTypeRepository } from '../db/repositories/prisma-employee-type.repository';
import { EmployeeTypeRepository } from 'src/domain/repositories/employee-type.repository';
import { CreateEmployeeTypeUseCase } from 'src/use-case/employee-type/create-employee-type.usecase';
import { FindAllEmployeeTypesUseCase } from 'src/use-case/employee-type/find-all-employee-types.usecase';
import { FindEmployeeTypeByIdUseCase } from 'src/use-case/employee-type/find-employee-type-by-id.usecase';
import { FindEmployeeTypeByNameUseCase } from 'src/use-case/employee-type/find-employee-type-by-name.usecase';
import { EmployeeTypeController } from '../controllers/employee-type.controller';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeTypeController],
  providers: [
    {
      provide: EmployeeTypeRepository,
      useClass: PrismaEmployeeTypeRepository,
    },
    PrismaEmployeeTypeRepository,
    CreateEmployeeTypeUseCase,
    FindAllEmployeeTypesUseCase,
    FindEmployeeTypeByIdUseCase,
    FindEmployeeTypeByNameUseCase,
  ],
  exports: [
    EmployeeTypeRepository,
    PrismaEmployeeTypeRepository,
    CreateEmployeeTypeUseCase,
    FindAllEmployeeTypesUseCase,
    FindEmployeeTypeByIdUseCase,
    FindEmployeeTypeByNameUseCase,
  ],
})
export class EmployeeTypeModule {} 