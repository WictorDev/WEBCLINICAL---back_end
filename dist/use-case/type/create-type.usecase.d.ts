import { PrismaTypeRepository } from 'src/infrastructure/db/repositories/prisma-type.repository';
import { Type } from 'src/domain/entities/type';
export declare class CreateTypeUseCase {
    private readonly typeRepo;
    constructor(typeRepo: PrismaTypeRepository);
    execute(data: {
        name: string;
    }): Promise<Type>;
}
