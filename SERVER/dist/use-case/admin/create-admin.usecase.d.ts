import { AdminRepository } from "src/domain/repositories/admin.repository";
import { Admin } from "src/domain/entities/admin";
import { TypeRepository } from "src/domain/repositories/type.repository";
export declare class CreateAdminUseCase {
    private readonly adminRepository;
    private readonly typeRepository;
    constructor(adminRepository: AdminRepository, typeRepository: TypeRepository);
    execute(data: {
        cpf: string;
        name: string;
        type: string;
    }): Promise<Admin>;
}
