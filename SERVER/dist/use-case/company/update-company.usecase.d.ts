import UniqueEntityCnpj from "src/core/entities/unique-entity-cnpj";
import { CompanyRepository } from "src/domain/repositories/company.repository";
export declare class UpdateCompanyUseCase {
    private CompanyRepository;
    constructor(CompanyRepository: CompanyRepository);
    execute(Cnpj: UniqueEntityCnpj, data: {
        name?: string;
        email?: string;
        password?: string;
        active?: boolean;
    }): Promise<import("../../domain/entities/company").Company>;
}
