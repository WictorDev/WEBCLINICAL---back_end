import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeType } from 'src/domain/entities/employee-type';
import { EmployeeTypeRepository } from 'src/domain/repositories/employee-type.repository';

@Injectable()
export class FindEmployeeTypeByNameUseCase {
  constructor(private readonly repo: EmployeeTypeRepository) {}

  async execute(name: string): Promise<EmployeeType> {
    const type = await this.repo.findByName(name);
    if (!type) throw new NotFoundException('Tipo de funcionário não encontrado');
    return type;
  }
} 