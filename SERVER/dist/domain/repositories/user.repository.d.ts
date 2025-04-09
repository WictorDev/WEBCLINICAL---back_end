import { User, UserData } from "src/domain/entities/user";
export declare abstract class UserRepository {
    abstract create(userData: User): Promise<User>;
    abstract findByCpf(cpf: string): Promise<User | null>;
    abstract update(cpf: string, userData: Partial<UserData>): Promise<User>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findAll(): Promise<User[]>;
}
