import { CreateAdminUseCase } from 'src/use-case/admin/create-admin.usecase';
import { DeleteAdminUseCase } from 'src/use-case/admin/delete-admin.usecase';
export declare class AdminController {
    private readonly createAdminUseCase;
    private readonly deleteAdminUseCase;
    constructor(createAdminUseCase: CreateAdminUseCase, deleteAdminUseCase: DeleteAdminUseCase);
    create(data: {
        cpf: string;
        name: string;
        type: string;
    }): Promise<import("../../domain/entities/admin").Admin>;
    delete(cpf: string): Promise<{
        message: string;
    }>;
}
