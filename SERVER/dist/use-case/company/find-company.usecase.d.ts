import { CompanyRepository } from "src/domain/repositories/company.repository";
export declare class FindCompanyUseCase {
    private CompanyRepository;
    constructor(CompanyRepository: CompanyRepository);
    execute(): Promise<import("../../domain/entities/company").Company[]>;
}
