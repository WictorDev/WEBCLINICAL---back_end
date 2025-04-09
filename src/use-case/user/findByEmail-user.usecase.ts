import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/repositories/user.repository";

@Injectable()
export class FindUserByEmailUseCase {
    constructor(private userRepository: UserRepository) {}
    async execute(email: string) {
        return await this.userRepository.findByEmail(email);
    }
}