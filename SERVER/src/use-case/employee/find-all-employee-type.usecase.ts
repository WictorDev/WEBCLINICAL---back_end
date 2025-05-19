import { Injectable } from '@nestjs/common';
import { PrismaEmployeeTypeRepository } from 'src/infrastructure/db/repositories/prisma-employee-type.repository';

@Injectable()
export class FindAllEmployeeTypeUseCase {
  constructor(private readonly employeeTypeRepo: PrismaEmployeeTypeRepository) {}

  async execute() {
    return this.employeeTypeRepo.findAll();
  }
} 