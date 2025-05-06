import { CompanyRepository } from "src/domain/repositories/company.repository";
export declare class FindCompanyByEmailUseCase {
    private CompanyRepository;
    constructor(CompanyRepository: CompanyRepository);
    execute(email: string): Promise<import("../../domain/entities/company").Company | null>;
}
