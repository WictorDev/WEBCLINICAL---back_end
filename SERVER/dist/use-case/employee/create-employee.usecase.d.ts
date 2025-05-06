import { EmployeeRepository } from 'src/domain/repositories/employee.repository';
import { Employee } from 'src/domain/entities/employee';
export declare class CreateEmployeeUseCase {
    private readonly repo;
    constructor(repo: EmployeeRepository);
    execute(data: {
        cpf: string;
        name: string;
        advice?: string;
        typeId: string;
        employeeTypeId: string;
    }): Promise<Employee>;
}
