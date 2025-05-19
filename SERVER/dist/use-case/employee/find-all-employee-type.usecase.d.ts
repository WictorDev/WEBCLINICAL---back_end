import { PrismaEmployeeTypeRepository } from 'src/infrastructure/db/repositories/prisma-employee-type.repository';
export declare class FindAllEmployeeTypeUseCase {
    private readonly employeeTypeRepo;
    constructor(employeeTypeRepo: PrismaEmployeeTypeRepository);
    execute(): Promise<import("../../domain/entities/employee-type").EmployeeType[]>;
}
