import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/modules/prisma.module';
import { EmployeeTypeRepository } from 'src/domain/repositories/employee-type.repository';
import { PrismaEmployeeTypeRepository } from '../db/repositories/prisma-employee-type.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: EmployeeTypeRepository,
      useClass: PrismaEmployeeTypeRepository,
    },
    PrismaEmployeeTypeRepository,
  ],
  exports: [
    EmployeeTypeRepository,
    PrismaEmployeeTypeRepository,
  ],
})
export class EmployeeTypeModule {} 