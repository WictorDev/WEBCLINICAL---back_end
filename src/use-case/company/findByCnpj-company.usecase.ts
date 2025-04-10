import { Injectable } from "@nestjs/common";
import UniqueEntityCnpj from "src/core/entities/unique-entity-cnpj";
import { CompanyRepository } from "src/domain/repositories/company.repository";

@Injectable()
export class FindCompanyByCnpjUseCase {
    constructor(private CompanyRepository: CompanyRepository) {}
    execute(cpf: UniqueEntityCnpj) {
        return this.CompanyRepository.findByCnpj(cpf.toString());
    }
}