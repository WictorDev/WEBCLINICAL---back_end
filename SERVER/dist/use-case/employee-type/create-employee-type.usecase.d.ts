import { EmployeeTypeRepository } from 'src/domain/repositories/employee-type.repository';
import { EmployeeType } from 'src/domain/entities/employee-type';
export declare class CreateEmployeeTypeUseCase {
    private readonly repo;
    constructor(repo: EmployeeTypeRepository);
    execute(data: {
        name: string;
    }): Promise<EmployeeType>;
}
