import UniqueEntitycpf from "src/core/entities/unique-entity-cpf";
import { User } from "src/domain/entities/user";
import { UserRepository } from "src/domain/repositories/user.repository";
export declare class CreateUserUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(data: {
        name: string;
        cpf: UniqueEntitycpf;
        email: string;
        password: string;
        companyId?: string;
        typeId?: string;
        active: boolean;
    }): Promise<User>;
}
