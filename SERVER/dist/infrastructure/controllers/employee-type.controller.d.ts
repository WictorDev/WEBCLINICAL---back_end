import { CreateEmployeeTypeUseCase } from 'src/use-case/employee-type/create-employee-type.usecase';
import { FindAllEmployeeTypesUseCase } from 'src/use-case/employee-type/find-all-employee-types.usecase';
import { FindEmployeeTypeByIdUseCase } from 'src/use-case/employee-type/find-employee-type-by-id.usecase';
import { FindEmployeeTypeByNameUseCase } from 'src/use-case/employee-type/find-employee-type-by-name.usecase';
export declare class EmployeeTypeController {
    private readonly createUseCase;
    private readonly findAllUseCase;
    private readonly findByIdUseCase;
    private readonly findByNameUseCase;
    constructor(createUseCase: CreateEmployeeTypeUseCase, findAllUseCase: FindAllEmployeeTypesUseCase, findByIdUseCase: FindEmployeeTypeByIdUseCase, findByNameUseCase: FindEmployeeTypeByNameUseCase);
    create(body: {
        name: string;
    }): Promise<import("../../domain/entities/employee-type").EmployeeType>;
    findAll(): Promise<import("../../domain/entities/employee-type").EmployeeType[]>;
    findById(id: string): Promise<import("../../domain/entities/employee-type").EmployeeType>;
    findByName(name: string): Promise<import("../../domain/entities/employee-type").EmployeeType>;
}
