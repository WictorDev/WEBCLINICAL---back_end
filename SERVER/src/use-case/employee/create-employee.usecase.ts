import { Injectable, BadRequestException } from '@nestjs/common';
import { EmployeeRepository } from 'src/domain/repositories/employee.repository';
import { Employee } from 'src/domain/entities/employee';
import { TypeRepository } from 'src/domain/repositories/type.repository';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly typeRepository: TypeRepository
  ) {}

  async execute(data: { cpf: string; name: string; type: string; employeeTypeId?: string; advice?: string }) {
    // Buscar o tipo pelo nome
    const type = await this.typeRepository.findByName(data.type);
    if (!type) {
      throw new BadRequestException(`Tipo ${data.type} não encontrado.`);
    }
    const employee = new Employee({
      cpf: data.cpf,
      name: data.name,
      typeId: type.id,
      employeeTypeId: data.employeeTypeId,
      advice: data.advice
    });
    return await this.employeeRepository.create(employee);
  }
} 