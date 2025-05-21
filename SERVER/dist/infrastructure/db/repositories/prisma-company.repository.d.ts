import { PrismaService } from 'src/core/services/prisma.service';
import { CompanyRepository } from 'src/domain/repositories/company.repository';
import { Company } from 'src/domain/entities/company';
export declare class PrismaCompanyRepository implements CompanyRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    private removeCnpjFormat;
    create(company: Company): Promise<Company>;
    findAll(): Promise<Company[]>;
    findByEmail(email: string): Promise<Company | null>;
    findByCnpj(cnpj: string): Promise<Company | null>;
    update(Cnpj: string, data: Partial<Company>): Promise<Company>;
    findByName(name: string): Promise<Company | null>;
}
