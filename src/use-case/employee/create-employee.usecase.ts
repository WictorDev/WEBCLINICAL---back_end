import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from 'src/domain/repositories/employee.repository';
import { Employee } from 'src/domain/entities/employee';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(data: { cpf: string; name: string; typeId: string; employeeTypeId: string; advice?: string }) {
    const employee = new Employee(data);
    return await this.employeeRepository.create(employee);
  }
} 