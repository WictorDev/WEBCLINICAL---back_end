import { AdminRepository } from 'src/domain/repositories/admin.repository';
export declare class DeleteAdminUseCase {
    private readonly adminRepository;
    constructor(adminRepository: AdminRepository);
    execute(cpf: string): Promise<void>;
}
