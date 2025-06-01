import { UserRepository } from "src/domain/repositories/user.repository";
import { User } from "src/domain/entities/user";
import { CreateAdminUseCase } from "../admin/create-admin.usecase";
import { TypeRepository } from "src/domain/repositories/type.repository";
export declare class CreateFirstAdminUseCase {
    private readonly userRepository;
    private readonly createAdminUseCase;
    private readonly typeRepository;
    constructor(userRepository: UserRepository, createAdminUseCase: CreateAdminUseCase, typeRepository: TypeRepository);
    execute(data: {
        name: string;
        cpf: string;
        email: string;
        password: string;
        companyId: string;
        active: boolean;
    }): Promise<User>;
}
