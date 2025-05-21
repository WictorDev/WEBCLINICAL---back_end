import { Injectable, BadRequestException } from "@nestjs/common";
import { AdminRepository } from "src/domain/repositories/admin.repository";
import { Admin } from "src/domain/entities/admin";
import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";
import { TypeRepository } from "src/domain/repositories/type.repository";

@Injectable()
export class CreateAdminUseCase {
    constructor(
        private readonly adminRepository: AdminRepository,
        private readonly typeRepository: TypeRepository
    ) { }

    async execute(data: { cpf: string, name: string, type: string }): Promise<Admin> {
        // Busca o tipo pelo nome
        const type = await this.typeRepository.findByName("ADMIN");
        if (!type) {
            throw new BadRequestException('Tipo ADMIN não encontrado.');
        }

        const admin = new Admin({
            cpf: new UniqueEntityCPF(data.cpf),
            name: data.name,
            type: type.id // Usa o ID do tipo ao invés do nome
        });
        return await this.adminRepository.create(admin);
    }
} 