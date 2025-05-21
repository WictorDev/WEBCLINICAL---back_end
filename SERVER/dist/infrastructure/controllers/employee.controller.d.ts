import { CreateEmployeeUseCase } from 'src/use-case/employee/create-employee.usecase';
import { UpdateEmployeeUseCase } from 'src/use-case/employee/update-employee.usecase';
import { PrismaEmployeeRepository } from '../db/repositories/prisma-employee.repository';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { EmployeeTypeRepository } from 'src/domain/repositories/employee-type.repository';
import { PrismaService } from 'src/core/services/prisma.service';
export declare class EmployeeController {
    private readonly createUseCase;
    private readonly updateUseCase;
    private readonly repo;
    private readonly typeRepository;
    private readonly employeeTypeRepository;
    private readonly prismaService;
    constructor(createUseCase: CreateEmployeeUseCase, updateUseCase: UpdateEmployeeUseCase, repo: PrismaEmployeeRepository, typeRepository: TypeRepository, employeeTypeRepository: EmployeeTypeRepository, prismaService: PrismaService);
    create(body: {
        cpf: string;
        name: string;
        advice?: string;
        type: string;
        employeeType: string;
    }): Promise<import("../../domain/entities/employee").Employee>;
    findAll(): Promise<{
        cpf: string;
        name: string;
        advice: string;
        typeId: string;
        employeeTypeId: string;
        typeName: string;
        employeeTypeName: string;
    }[]>;
    update(cpf: string, body: Partial<{
        name: string;
        advice?: string;
        type?: string;
        employeeType?: string;
    }>): Promise<import("../../domain/entities/employee").Employee>;
}
