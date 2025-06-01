import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from 'src/domain/repositories/employee.repository';
import { Employee } from 'src/domain/entities/employee';

@Injectable()
export class UpdateEmployeeUseCase {
  constructor(private readonly repo: EmployeeRepository) {}

  async execute(cpf: string, data: Partial<Employee>) {
    return this.repo.update(cpf, data);
  }
} 