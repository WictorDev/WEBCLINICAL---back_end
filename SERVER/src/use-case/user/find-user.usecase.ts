import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/user.repository";

@Injectable()
export class FindUserUseCase {
    constructor(private userRepository: UserRepository) {}
    async execute() {
        return await this.userRepository.findAll();
    }
}