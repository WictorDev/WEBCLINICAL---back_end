import { Company } from 'src/domain/entities/company';

export abstract class CompanyRepository {
  abstract create(company: Company): Promise<Company>;
  abstract findByCnpj(cnpj: string): Promise<Company | null>;
  abstract findByEmail(email: string): Promise<Company | null>;
  abstract findAll(): Promise<Company[]>;
}
