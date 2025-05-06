import UniqueEntityCnpj from "src/core/entities/unique-entity-cnpj";
import { CompanyRepository } from "src/domain/repositories/company.repository";
export declare class FindCompanyByCnpjUseCase {
    private CompanyRepository;
    constructor(CompanyRepository: CompanyRepository);
    execute(Cnpj: UniqueEntityCnpj): Promise<import("../../domain/entities/company").Company | null>;
}
