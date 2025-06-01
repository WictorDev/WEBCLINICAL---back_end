import { Injectable } from "@nestjs/common";
import UniqueEntitycpf from "src/core/entities/unique-entity-cpf";
import { UserRepository } from "src/domain/repositories/user.repository";

@Injectable()
export class FindUserByCpfUseCase {
    constructor(private userRepository: UserRepository) {}
    execute(cpf: UniqueEntitycpf) {
        return this.userRepository.findByCpf(cpf.toString());
    }
}