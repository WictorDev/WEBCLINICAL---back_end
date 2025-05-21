import { PrismaService } from 'src/core/services/prisma.service';
import { AdminRepository } from 'src/domain/repositories/admin.repository';
import { Admin } from 'src/domain/entities/admin';
export declare class PrismaAdminRepository implements AdminRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Admin): Promise<Admin>;
    update(cpf: string, data: Partial<Admin>): Promise<Admin>;
    findByCpf(cpf: string): Promise<Admin | null>;
    findAll(): Promise<Admin[]>;
}
