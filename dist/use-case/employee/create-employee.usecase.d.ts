import { EmployeeRepository } from 'src/domain/repositories/employee.repository';
import { Employee } from 'src/domain/entities/employee';
export declare class CreateEmployeeUseCase {
    private readonly employeeRepository;
    constructor(employeeRepository: EmployeeRepository);
    execute(data: {
        cpf: string;
        name: string;
        typeId: string;
        employeeTypeId: string;
        advice?: string;
    }): Promise<Employee>;
}
