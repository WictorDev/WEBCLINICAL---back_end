import { PrismaTypeRepository } from 'src/infrastructure/db/repositories/prisma-type.repository';
export declare class FindTypeUseCase {
    private readonly typeRepo;
    constructor(typeRepo: PrismaTypeRepository);
    execute(typeId: string): Promise<import("../../domain/entities/type").Type | null>;
}
