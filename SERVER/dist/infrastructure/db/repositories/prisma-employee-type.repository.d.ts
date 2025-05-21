import { PrismaService } from 'src/core/services/prisma.service';
import { EmployeeType } from 'src/domain/entities/employee-type';
import { EmployeeTypeRepository } from 'src/domain/repositories/employee-type.repository';
export declare class PrismaEmployeeTypeRepository implements EmployeeTypeRepository {
    private readonly prismaService;
    private readonly logger;
    constructor(prismaService: PrismaService);
    create(employeeType: EmployeeType): Promise<EmployeeType>;
    findAll(): Promise<EmployeeType[]>;
    findById(id: string): Promise<EmployeeType | null>;
    findByName(name: string): Promise<EmployeeType | null>;
}
