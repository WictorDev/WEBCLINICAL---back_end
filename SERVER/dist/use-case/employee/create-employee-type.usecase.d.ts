import { PrismaEmployeeTypeRepository } from 'src/infrastructure/db/repositories/prisma-employee-type.repository';
import { EmployeeType } from 'src/domain/entities/employee-type';
export declare class CreateEmployeeTypeUseCase {
    private readonly employeeTypeRepo;
    constructor(employeeTypeRepo: PrismaEmployeeTypeRepository);
    execute(data: {
        name: string;
    }): Promise<EmployeeType>;
}
