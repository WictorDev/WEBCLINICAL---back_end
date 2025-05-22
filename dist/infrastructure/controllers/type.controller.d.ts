import { CreateTypeUseCase } from 'src/use-case/type/create-type.usecase';
import { FindTypeUseCase } from 'src/use-case/type/find-type.usecase';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { Type } from 'src/domain/entities/type';
export declare class TypeController {
    private readonly createTypeUseCase;
    private readonly findTypeUseCase;
    private readonly typeRepository;
    constructor(createTypeUseCase: CreateTypeUseCase, findTypeUseCase: FindTypeUseCase, typeRepository: TypeRepository);
    create(body: {
        name: string;
    }): Promise<Type>;
    findAll(): Promise<Type[]>;
    findById(typeId: string): Promise<Type | null>;
    createInitialTypes(): Promise<Type[]>;
}
