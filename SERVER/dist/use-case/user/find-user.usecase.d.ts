import { UserRepository } from "src/domain/repositories/user.repository";
export declare class FindUserUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(): Promise<import("../../domain/entities/user").User[]>;
}
