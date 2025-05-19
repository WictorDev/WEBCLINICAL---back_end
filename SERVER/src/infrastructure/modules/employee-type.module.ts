import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { EmployeeTypeController } from '../controllers/employee-type.controller';
import { CreateEmployeeTypeUseCase } from 'src/use-case/employee/create-employee-type.usecase';
import { FindAllEmployeeTypeUseCase } from 'src/use-case/employee/find-all-employee-type.usecase';
import { PrismaEmployeeTypeRepository } from '../db/repositories/prisma-employee-type.repository';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeTypeController],
  providers: [
    CreateEmployeeTypeUseCase,
    FindAllEmployeeTypeUseCase,
    PrismaEmployeeTypeRepository
  ],
  exports: [
    CreateEmployeeTypeUseCase,
    FindAllEmployeeTypeUseCase,
    PrismaEmployeeTypeRepository
  ]
})
export class EmployeeTypeModule {} 