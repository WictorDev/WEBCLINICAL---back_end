import { Injectable } from '@nestjs/common';
import { EmployeeType } from 'src/domain/entities/employee-type';
import { EmployeeTypeRepository } from 'src/domain/repositories/employee-type.repository';

@Injectable()
export class FindAllEmployeeTypesUseCase {
  constructor(private readonly repo: EmployeeTypeRepository) {}

  async execute(): Promise<EmployeeType[]> {
    return this.repo.findAll();
  }
} 