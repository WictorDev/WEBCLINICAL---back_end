import UniqueEntitycpf from "src/core/entities/unique-entity-cpf";
import { UserRepository } from "src/domain/repositories/user.repository";
export declare class FindUserByCpfUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(cpf: UniqueEntitycpf): Promise<import("../../domain/entities/user").User | null>;
}
