import { Injectable } from "@nestjs/common";
import UniqueEntityCnpj from "src/core/entities/unique-entity-cnpj";
import UniqueEntitycpf from "src/core/entities/unique-entity-cpf";
import { CompanyRepository } from "src/domain/repositories/company.repository";
import { UserRepository } from "src/domain/repositories/user.repository";

@Injectable()
export class UpdateCompanyUseCase {
    constructor(private CompanyRepository: CompanyRepository) { }

    async execute(Cnpj: UniqueEntityCnpj, data: { name?: string; email?: string; password?: string; active?: boolean }) {
        const existingUser = await this.CompanyRepository.findByCnpj(Cnpj.toString());

        if (!existingUser) {
            throw new Error("Usuário não encontrado.");
        }

        return await this.CompanyRepository.update(Cnpj.toString(), data);
    }
}

