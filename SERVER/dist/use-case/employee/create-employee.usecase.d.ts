import { EmployeeRepository } from 'src/domain/repositories/employee.repository';
import { Employee } from 'src/domain/entities/employee';
import { TypeRepository } from 'src/domain/repositories/type.repository';
export declare class CreateEmployeeUseCase {
    private readonly employeeRepository;
    private readonly typeRepository;
    constructor(employeeRepository: EmployeeRepository, typeRepository: TypeRepository);
    execute(data: {
        cpf: string;
        name: string;
        type: string;
        employeeTypeId?: string;
        advice?: string;
    }): Promise<Employee>;
}
