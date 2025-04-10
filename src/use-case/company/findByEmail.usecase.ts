import { Injectable } from "@nestjs/common";
import { CompanyRepository } from "src/domain/repositories/company.repository";


@Injectable()
export class FindCompanyByEmailUseCase {
    constructor(private CompanyRepository: CompanyRepository) {}
    async execute(email: string) {
        return await this.CompanyRepository.findByEmail(email);
    }
}