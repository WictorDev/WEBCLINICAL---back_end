import { Injectable } from "@nestjs/common";
import UniqueEntitycpf from "src/core/entities/unique-entity-cpf";
import { UserRepository } from "src/repositories/user.repository";

@Injectable()
export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(cpf: UniqueEntitycpf, data: { name?: string; email?: string; password?: string; active?: boolean }) {
        const existingUser = await this.userRepository.findByCpf(cpf.toString());

        if (!existingUser) {
            throw new Error("Usuário não encontrado.");
        }

        return await this.userRepository.update(cpf.toString(), data);
    }
}

