import { EmployeeRepository } from 'src/domain/repositories/employee.repository';
import { Employee } from 'src/domain/entities/employee';
export declare class UpdateEmployeeUseCase {
    private readonly repo;
    constructor(repo: EmployeeRepository);
    execute(cpf: string, data: Partial<Employee>): Promise<Employee>;
}
