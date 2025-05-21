import { CreateUserUseCase } from 'src/use-case/user/create-user.usecase';
import { UpdateUserUseCase } from 'src/use-case/user/update-user.usecase';
import { FindUserByCpfUseCase } from 'src/use-case/user/findByCpf-user.usecase';
import { FindUserByEmailUseCase } from 'src/use-case/user/findByEmail-user.usecase';
import { FindUserUseCase } from 'src/use-case/user/find-user.usecase';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { CreateFirstAdminUseCase } from 'src/use-case/user/create-first-admin.usecase';
export declare class UserController {
    private readonly createUserUseCase;
    private readonly updateUserUseCase;
    private readonly findUserByCpfUseCase;
    private readonly findUserByEmailUseCase;
    private readonly findUserUseCase;
    private readonly typeRepository;
    private readonly createFirstAdminUseCase;
    constructor(createUserUseCase: CreateUserUseCase, updateUserUseCase: UpdateUserUseCase, findUserByCpfUseCase: FindUserByCpfUseCase, findUserByEmailUseCase: FindUserByEmailUseCase, findUserUseCase: FindUserUseCase, typeRepository: TypeRepository, createFirstAdminUseCase: CreateFirstAdminUseCase);
    findAll(): Promise<import("../../domain/entities/user").User[]>;
    findByEmail(email: string): Promise<import("../../domain/entities/user").User | null>;
    findByCpf(cpf: string): Promise<import("../../domain/entities/user").User | null>;
    create(body: {
        name: string;
        cpf: string;
        email: string;
        password: string;
        companyId: string;
        type: string;
        active: boolean;
    }): Promise<import("../../domain/entities/user").User>;
    createFirstUser(body: {
        name: string;
        cpf: string;
        email: string;
        password: string;
        companyId: string;
        active: boolean;
    }): Promise<import("../../domain/entities/user").User>;
    update(cpf: string, body: any): Promise<import("../../domain/entities/user").User>;
    delete(cpf: string): Promise<import("../../domain/entities/user").User>;
}
