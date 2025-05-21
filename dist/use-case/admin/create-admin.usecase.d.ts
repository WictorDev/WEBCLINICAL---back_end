import { AdminRepository } from "src/domain/repositories/admin.repository";
import { Admin } from "src/domain/entities/admin";
export declare class CreateAdminUseCase {
    private readonly adminRepository;
    constructor(adminRepository: AdminRepository);
    execute(data: {
        cpf: string;
        name: string;
        type: string;
    }): Promise<Admin>;
}
