import { CreateCompanyUseCase } from 'src/use-case/company/create-company.usecase';
import { UpdateCompanyUseCase } from 'src/use-case/company/update-company.usecase';
import { FindCompanyByEmailUseCase } from 'src/use-case/company/findByEmail.usecase';
import { FindCompanyByCnpjUseCase } from 'src/use-case/company/findByCnpj-company.usecase';
import { FindCompanyUseCase } from 'src/use-case/company/find-company.usecase';
export declare class CompanyController {
    private readonly createCompanyUseCase;
    private readonly updateCompanyUseCase;
    private readonly findCompanyByEmailUseCase;
    private readonly findCompanyByCnpjUseCase;
    private readonly findCompanyUseCase;
    constructor(createCompanyUseCase: CreateCompanyUseCase, updateCompanyUseCase: UpdateCompanyUseCase, findCompanyByEmailUseCase: FindCompanyByEmailUseCase, findCompanyByCnpjUseCase: FindCompanyByCnpjUseCase, findCompanyUseCase: FindCompanyUseCase);
    findAll(): Promise<import("../../domain/entities/company").Company[]>;
    findByEmail(email: string): Promise<import("../../domain/entities/company").Company | null>;
    findByCnpj(cnpj: string): Promise<import("../../domain/entities/company").Company | null>;
    create(body: {
        cnpj: string;
        name: string;
        phone: string;
        email: string;
    }): Promise<import("../../domain/entities/company").Company>;
    update(cnpj: string, body: any): Promise<import("../../domain/entities/company").Company>;
    createFirstCompany(body: {
        cnpj: string;
        name: string;
        phone: string;
        email: string;
    }): Promise<import("../../domain/entities/company").Company>;
}
