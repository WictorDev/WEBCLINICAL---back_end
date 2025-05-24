import { Injectable, BadRequestException } from "@nestjs/common";
import UniqueEntitycpf from "src/core/entities/unique-entity-cpf";
import { UserRepository } from "src/domain/repositories/user.repository";
import { TypeRepository } from "src/domain/repositories/type.repository";
import { DeleteAdminUseCase } from "../admin/delete-admin.usecase";
import { DeleteEmployeeUseCase } from "../employee/delete-employee.usecase";

@Injectable()
export class DeleteUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private typeRepository: TypeRepository,
        private deleteAdminUseCase: DeleteAdminUseCase,
        private deleteEmployeeUseCase: DeleteEmployeeUseCase
    ) { }

    async execute(cpf: UniqueEntitycpf) {
        const existingUser = await this.userRepository.findByCpf(cpf.toString());

        if (!existingUser) {
            throw new BadRequestException("Usuário não encontrado.");
        }

        // Remove registros das tabelas específicas
        for (const typeId of existingUser.types) {
            const type = await this.typeRepository.findById(typeId);
            if (type) {
                await this.removeFromSpecificTable(type.name, cpf.toString());
            }
        }

        // Remove o usuário
        await this.userRepository.delete(cpf.toString());
    }

    private async removeFromSpecificTable(typeName: string, cpf: string) {
        switch (typeName.toUpperCase()) {
            case 'ADMIN':
                await this.deleteAdminUseCase.execute(cpf);
                break;

            case 'EMPLOYEE':
                await this.deleteEmployeeUseCase.execute(cpf);
                break;

            default:
                throw new BadRequestException(`Tipo ${typeName} não suportado`);
        }
    }
} 