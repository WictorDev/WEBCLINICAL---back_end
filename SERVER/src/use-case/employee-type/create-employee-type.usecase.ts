import { Injectable, BadRequestException } from '@nestjs/common';
import { EmployeeTypeRepository } from 'src/domain/repositories/employee-type.repository';
import { EmployeeType } from 'src/domain/entities/employee-type';

@Injectable()
export class CreateEmployeeTypeUseCase {
  constructor(private readonly repo: EmployeeTypeRepository) {}

  async execute(data: { name: string }): Promise<EmployeeType> {
    if (!data.name || !data.name.trim()) {
      throw new BadRequestException('Nome do tipo é obrigatório.');
    }
    const employeeType = new EmployeeType({ id: '', name: data.name });
    return this.repo.create(employeeType);
  }
} 