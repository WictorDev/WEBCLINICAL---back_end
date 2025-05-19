import { CreateEmployeeTypeUseCase } from 'src/use-case/employee/create-employee-type.usecase';
import { FindAllEmployeeTypeUseCase } from 'src/use-case/employee/find-all-employee-type.usecase';
export declare class EmployeeTypeController {
    private readonly createEmployeeTypeUseCase;
    private readonly findAllEmployeeTypeUseCase;
    constructor(createEmployeeTypeUseCase: CreateEmployeeTypeUseCase, findAllEmployeeTypeUseCase: FindAllEmployeeTypeUseCase);
    create(body: {
        name: string;
    }): Promise<import("../../domain/entities/employee-type").EmployeeType>;
    findAll(): Promise<import("../../domain/entities/employee-type").EmployeeType[]>;
}
