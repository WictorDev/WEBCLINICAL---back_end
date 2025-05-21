import { Injectable } from "@nestjs/common";
import UniqueEntitycpf from "src/core/entities/unique-entity-cpf";
import { User } from "src/domain/entities/user";
import { UserRepository } from "src/domain/repositories/user.repository";

@Injectable()
export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) { }
    async execute(data: { name: string, cpf: UniqueEntitycpf, email: string, password: string, companyId: string, type: string, active: boolean }) {
        const user = new User(data);
        return await this.userRepository.create(user);
    }
}