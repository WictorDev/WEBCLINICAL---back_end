import { EmployeeType } from 'src/domain/entities/employee-type';
import { EmployeeTypeRepository } from 'src/domain/repositories/employee-type.repository';
export declare class FindEmployeeTypeByIdUseCase {
    private readonly repo;
    constructor(repo: EmployeeTypeRepository);
    execute(id: string): Promise<EmployeeType>;
}
