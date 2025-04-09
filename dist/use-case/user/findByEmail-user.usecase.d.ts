import { UserRepository } from "src/domain/repositories/user.repository";
export declare class FindUserByEmailUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(email: string): Promise<import("../../domain/entities/user").User | null>;
}
