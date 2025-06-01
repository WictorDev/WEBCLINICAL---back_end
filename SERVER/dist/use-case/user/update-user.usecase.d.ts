import UniqueEntitycpf from "src/core/entities/unique-entity-cpf";
import { UserRepository } from "src/domain/repositories/user.repository";
import { TypeRepository } from "src/domain/repositories/type.repository";
import { CreateAdminUseCase } from "../admin/create-admin.usecase";
import { CreateEmployeeUseCase } from "../employee/create-employee.usecase";
import { DeleteAdminUseCase } from "../admin/delete-admin.usecase";
import { DeleteEmployeeUseCase } from "../employee/delete-employee.usecase";
import { EmployeeTypeRepository } from "src/domain/repositories/employee-type.repository";
import { EmployeeRepository } from "src/domain/repositories/employee.repository";
import { PrismaService } from "src/core/services/prisma.service";
export declare class UpdateUserUseCase {
    private userRepository;
    private typeRepository;
    private employeeTypeRepository;
    private employeeRepository;
    private createAdminUseCase;
    private createEmployeeUseCase;
    private deleteAdminUseCase;
    private deleteEmployeeUseCase;
    private prismaService;
    constructor(userRepository: UserRepository, typeRepository: TypeRepository, employeeTypeRepository: EmployeeTypeRepository, employeeRepository: EmployeeRepository, createAdminUseCase: CreateAdminUseCase, createEmployeeUseCase: CreateEmployeeUseCase, deleteAdminUseCase: DeleteAdminUseCase, deleteEmployeeUseCase: DeleteEmployeeUseCase, prismaService: PrismaService);
    execute(cpf: UniqueEntitycpf, data: {
        name?: string;
        email?: string;
        password?: string;
        types?: string[];
        companyId?: string;
        active?: boolean;
        employeeTypeId?: string;
        advice?: string;
    }): Promise<import("../../domain/entities/user").User>;
    private createInSpecificTable;
    private removeFromSpecificTable;
}
