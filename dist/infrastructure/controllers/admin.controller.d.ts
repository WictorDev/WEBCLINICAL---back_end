import { CreateAdminUseCase } from 'src/use-case/admin/create-admin.usecase';
export declare class AdminController {
    private readonly createAdminUseCase;
    constructor(createAdminUseCase: CreateAdminUseCase);
    create(data: {
        cpf: string;
        name: string;
        type: string;
    }): Promise<import("../../domain/entities/admin").Admin>;
}
