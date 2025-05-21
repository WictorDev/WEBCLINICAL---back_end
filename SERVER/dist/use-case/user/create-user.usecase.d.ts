import { UserRepository } from 'src/domain/repositories/user.repository';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { User } from 'src/domain/entities/user';
export declare class CreateUserUseCase {
    private readonly userRepository;
    private readonly typeRepository;
    constructor(userRepository: UserRepository, typeRepository: TypeRepository);
    execute(data: {
        name: string;
        cpf: string;
        email: string;
        password: string;
        companyId: string;
        type: string;
        active: boolean;
        employeeTypeId?: string;
    }): Promise<User>;
}
