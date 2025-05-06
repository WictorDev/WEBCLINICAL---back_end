import { CreateTypeUseCase } from 'src/use-case/type/create-type.usecase';
export declare class TypeController {
    private readonly createTypeUseCase;
    constructor(createTypeUseCase: CreateTypeUseCase);
    create(body: {
        name: string;
    }): Promise<import("../../domain/entities/type").Type>;
}
