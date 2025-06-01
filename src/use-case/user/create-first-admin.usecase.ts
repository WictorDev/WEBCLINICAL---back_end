import { Injectable, BadRequestException } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/user.repository";
import { User } from "src/domain/entities/user";
import { CreateAdminUseCase } from "../admin/create-admin.usecase";
import UniqueEntityCpf from "src/core/entities/unique-entity-cpf";
import { TypeRepository } from "src/domain/repositories/type.repository";
import { Type } from "src/domain/entities/type";
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateFirstAdminUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly createAdminUseCase: CreateAdminUseCase,
        private readonly typeRepository: TypeRepository
    ) { }

    async execute(data: { 
        name: string, 
        cpf: string, 
        email: string, 
        password: string, 
        companyId: string, 
        active: boolean 
    }) {
        try {
            // Busca o tipo pelo nome
            const type = await this.typeRepository.findByName('ADMIN');
            if (!type) {
                throw new BadRequestException('Tipo ADMIN não encontrado no banco de dados');
            }

            // Hash da senha
            const hashedPassword = await bcrypt.hash(data.password, 10);

            const user = new User({
                name: data.name,
                cpf: new UniqueEntityCpf(data.cpf),
                email: data.email,
                password: hashedPassword,
                companyId: data.companyId,
                types: [type.name],
                active: data.active
            });

            const createdUser = await this.userRepository.create(user);

            await this.createAdminUseCase.execute({
                cpf: data.cpf,
                name: data.name,
                type: type.name
            });

            return createdUser;
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException(`Erro ao criar usuário administrador: ${error.message}`);
        }
    }
} 