import { Injectable } from "@nestjs/common";
import { AdminRepository } from "src/domain/repositories/admin.repository";
import { Admin } from "src/domain/entities/admin";
import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";

@Injectable()
export class CreateAdminUseCase {
    constructor(private readonly adminRepository: AdminRepository) { }

    async execute(data: { cpf: string, name: string, type: string }): Promise<Admin> {
        const admin = new Admin({
            cpf: new UniqueEntityCPF(data.cpf),
            name: data.name,
            type: data.type
        });
        return await this.adminRepository.create(admin);
    }
} 