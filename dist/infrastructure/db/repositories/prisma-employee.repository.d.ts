import { PrismaService } from 'src/core/services/prisma.service';
import { Employee } from 'src/domain/entities/employee';
import { EmployeeRepository } from 'src/domain/repositories/employee.repository';
export declare class PrismaEmployeeRepository implements EmployeeRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(employee: Employee): Promise<Employee>;
    findAll(): Promise<Employee[]>;
    findByCpf(cpf: string): Promise<Employee | null>;
    update(cpf: string, data: Partial<Employee>): Promise<Employee>;
}
