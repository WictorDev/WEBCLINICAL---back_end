import { PrismaService } from 'src/core/services/prisma.service';
import { Type } from 'src/domain/entities/type';
import { TypeRepository } from 'src/domain/repositories/type.repository';
export declare class PrismaTypeRepository implements TypeRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(type: Type): Promise<Type>;
    findAll(): Promise<Type[]>;
    findById(id: string): Promise<Type | null>;
    findByName(name: string): Promise<Type | null>;
}
