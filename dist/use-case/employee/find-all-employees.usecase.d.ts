import { EmployeeRepository } from '../../domain/repositories/employee.repository';
import { Employee } from '../../domain/entities/employee';
export declare class FindAllEmployeesUseCase {
    private readonly employeeRepository;
    constructor(employeeRepository: EmployeeRepository);
    execute(): Promise<Employee[]>;
}
