import UniqueEntitycpf from "src/core/entities/unique-entity-cpf";
import { UserRepository } from "src/domain/repositories/user.repository";
export declare class UpdateUserUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(cpf: UniqueEntitycpf, data: {
        name?: string;
        email?: string;
        password?: string;
        active?: boolean;
    }): Promise<import("../../domain/entities/user").User>;
}
