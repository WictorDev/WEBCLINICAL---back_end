import { UserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user';
export declare class FindAllUsersUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(): Promise<User[]>;
}
