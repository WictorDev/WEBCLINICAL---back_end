import { Company } from 'src/domain/entities/company';
export declare abstract class CompanyRepository {
    abstract create(company: Company): Promise<Company>;
    abstract findByCnpj(cnpj: string): Promise<Company | null>;
    abstract findByEmail(email: string): Promise<Company | null>;
    abstract findByName(name: string): Promise<Company | null>;
    abstract findAll(): Promise<Company[]>;
    abstract update(Cnpj: string, data: Partial<Company>): Promise<Company>;
}
