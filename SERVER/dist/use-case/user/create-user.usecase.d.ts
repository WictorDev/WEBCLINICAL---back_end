import { UserRepository } from 'src/domain/repositories/user.repository';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { User } from 'src/domain/entities/user';
import { CreateAdminUseCase } from '../admin/create-admin.usecase';
import { CreateEmployeeUseCase } from '../employee/create-employee.usecase';
import { CreatePatientUseCase } from '../patient/create-patient.usecase';
export declare class CreateUserUseCase {
    private readonly userRepository;
    private readonly typeRepository;
    private readonly createAdminUseCase;
    private readonly createEmployeeUseCase;
    private readonly createPatientUseCase;
    constructor(userRepository: UserRepository, typeRepository: TypeRepository, createAdminUseCase: CreateAdminUseCase, createEmployeeUseCase: CreateEmployeeUseCase, createPatientUseCase: CreatePatientUseCase);
    execute(data: {
        name: string;
        cpf: string;
        email: string;
        password: string;
        companyId: string;
        type: string;
        active: boolean;
        employeeTypeId?: string;
        advice?: string;
    }): Promise<User>;
    private createInSpecificTable;
}
