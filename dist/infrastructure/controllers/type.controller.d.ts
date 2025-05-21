import { CreateTypeUseCase } from 'src/use-case/type/create-type.usecase';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { Type } from 'src/domain/entities/type';
export declare class TypeController {
    private readonly createTypeUseCase;
    private readonly typeRepository;
    constructor(createTypeUseCase: CreateTypeUseCase, typeRepository: TypeRepository);
    create(body: {
        name: string;
    }): Promise<Type>;
    createInitialTypes(): Promise<Type[]>;
}
