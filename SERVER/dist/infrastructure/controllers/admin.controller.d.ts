import { CreateAdminUseCase } from 'src/use-case/admin/create-admin.usecase';
import { Admin } from 'src/domain/entities/admin';
export declare class AdminController {
    private readonly createAdminUseCase;
    constructor(createAdminUseCase: CreateAdminUseCase);
    create(data: {
        cpf: string;
        name: string;
        type: string;
    }): Promise<Admin>;
}
