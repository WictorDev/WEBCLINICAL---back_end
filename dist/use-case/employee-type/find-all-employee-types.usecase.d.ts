import { EmployeeType } from 'src/domain/entities/employee-type';
import { EmployeeTypeRepository } from 'src/domain/repositories/employee-type.repository';
export declare class FindAllEmployeeTypesUseCase {
    private readonly repo;
    constructor(repo: EmployeeTypeRepository);
    execute(): Promise<EmployeeType[]>;
}
