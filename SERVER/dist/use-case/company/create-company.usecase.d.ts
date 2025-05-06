import { Company } from 'src/domain/entities/company';
import { CompanyRepository } from 'src/domain/repositories/company.repository';
import { UniqueEntityCnpj } from 'src/core/entities/unique-entity-cnpj';
export declare class CreateCompanyUseCase {
    private readonly companyRepository;
    constructor(companyRepository: CompanyRepository);
    execute(data: {
        name: string;
        cnpj: UniqueEntityCnpj;
        email: string;
        phone: string;
    }): Promise<Company>;
}
