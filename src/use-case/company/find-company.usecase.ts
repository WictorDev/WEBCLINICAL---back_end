import { Injectable } from "@nestjs/common";
import { CompanyRepository } from "src/domain/repositories/company.repository";

@Injectable()
export class FindCompanyUseCase {
    constructor(private CompanyRepository: CompanyRepository) {}
    async execute() {
        return await this.CompanyRepository.findAll();
    }
}