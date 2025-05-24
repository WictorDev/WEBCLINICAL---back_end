import { CreateEmployeeUseCase } from 'src/use-case/employee/create-employee.usecase';
import { UpdateEmployeeUseCase } from 'src/use-case/employee/update-employee.usecase';
import { DeleteEmployeeUseCase } from 'src/use-case/employee/delete-employee.usecase';
import { PrismaEmployeeRepository } from '../db/repositories/prisma-employee.repository';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { EmployeeTypeRepository } from 'src/domain/repositories/employee-type.repository';
export declare class EmployeeController {
    private readonly createUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    private readonly repo;
    private readonly typeRepository;
    private readonly employeeTypeRepository;
    constructor(createUseCase: CreateEmployeeUseCase, updateUseCase: UpdateEmployeeUseCase, deleteUseCase: DeleteEmployeeUseCase, repo: PrismaEmployeeRepository, typeRepository: TypeRepository, employeeTypeRepository: EmployeeTypeRepository);
    create(body: {
        cpf: string;
        name: string;
        advice?: string;
        type: string;
        employeeType?: string;
    }): Promise<import("../../domain/entities/employee").Employee>;
    findAll(): Promise<any[]>;
    update(cpf: string, body: Partial<{
        name: string;
        advice?: string;
        type?: string;
        employeeType?: string;
    }>): Promise<import("../../domain/entities/employee").Employee>;
    delete(cpf: string): Promise<{
        message: string;
    }>;
}
