import { EmployeeRepository } from 'src/domain/repositories/employee.repository';
export declare class DeleteEmployeeUseCase {
    private readonly employeeRepository;
    constructor(employeeRepository: EmployeeRepository);
    execute(cpf: string): Promise<void>;
}
