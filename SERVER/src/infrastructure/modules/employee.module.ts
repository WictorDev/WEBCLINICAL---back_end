import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/modules/prisma.module';
import { EmployeeController } from '../controllers/employee.controller';
import { PrismaEmployeeRepository } from '../db/repositories/prisma-employee.repository';
import { CreateEmployeeUseCase } from 'src/use-case/employee/create-employee.usecase';
import { UpdateEmployeeUseCase } from 'src/use-case/employee/update-employee.usecase';
import { DeleteEmployeeUseCase } from 'src/use-case/employee/delete-employee.usecase';
import { EmployeeRepository } from 'src/domain/repositories/employee.repository';
import { TypeModule } from './type.module';
import { EmployeeTypeModule } from './employee-type.module';

@Module({
  imports: [PrismaModule, TypeModule, EmployeeTypeModule],
  controllers: [EmployeeController],
  providers: [
    {
      provide: EmployeeRepository,
      useClass: PrismaEmployeeRepository,
    },
    PrismaEmployeeRepository,
    CreateEmployeeUseCase,
    UpdateEmployeeUseCase,
    DeleteEmployeeUseCase,
  ],
  exports: [
    EmployeeRepository,
    PrismaEmployeeRepository,
    CreateEmployeeUseCase,
    UpdateEmployeeUseCase,
    DeleteEmployeeUseCase,
  ],
})
export class EmployeeModule {} 