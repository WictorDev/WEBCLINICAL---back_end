import { UserRepository } from 'src/domain/repositories/user.repository';
import { PrismaService } from 'src/core/services/prisma.service';
import { User } from 'src/domain/entities/user';
export declare class PrismaUserRepository implements UserRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(user: User): Promise<User>;
    update(cpf: string, user: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    findByCpf(cpf: string): Promise<User | null>;
    addType(cpf: string, typeId: string): Promise<void>;
    delete(cpf: string): Promise<void>;
    removeType(cpf: string, typeName: string): Promise<void>;
}
