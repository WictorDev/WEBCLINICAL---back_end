import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from 'src/domain/repositories/employee.repository';
import { Employee } from 'src/domain/entities/employee';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(private readonly repo: EmployeeRepository) {}

  async execute(data: { cpf: string; name: string; advice?: string; typeId: string; employeeTypeId: string }) {
    const employee = new Employee(data);
    return this.repo.create(employee);
  }
} 