import { Injectable, BadRequestException } from '@nestjs/common';
import { EmployeeRepository } from 'src/domain/repositories/employee.repository';

@Injectable()
export class DeleteEmployeeUseCase {
    constructor(
        private readonly employeeRepository: EmployeeRepository
    ) { }

    async execute(cpf: string): Promise<void> {
        const employee = await this.employeeRepository.findByCpf(cpf);
        
        if (!employee) {
            throw new BadRequestException('Funcionário não encontrado.');
        }

        await this.employeeRepository.delete(cpf);
    }
} 