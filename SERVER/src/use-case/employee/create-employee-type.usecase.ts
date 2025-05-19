import { Injectable } from '@nestjs/common';
import { PrismaEmployeeTypeRepository } from 'src/infrastructure/db/repositories/prisma-employee-type.repository';
import { EmployeeType } from 'src/domain/entities/employee-type';

@Injectable()
export class CreateEmployeeTypeUseCase {
  constructor(private readonly employeeTypeRepo: PrismaEmployeeTypeRepository) {}

  async execute(data: { name: string }) {
    const employeeType = new EmployeeType({ id: '', name: data.name });
    return this.employeeTypeRepo.create(employeeType);
  }
} 