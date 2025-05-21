import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/user.repository";
import { User } from "src/domain/entities/user";
import { CreateAdminUseCase } from "../admin/create-admin.usecase";
import UniqueEntityCpf from "src/core/entities/unique-entity-cpf";
import { TypeRepository } from "src/domain/repositories/type.repository";
import { Type } from "src/domain/entities/type";

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
        // Primeiro, busca ou cria o tipo ADMIN
        let type = await this.typeRepository.findByName('ADMIN');
        if (!type) {
            type = await this.typeRepository.create(new Type({
                id: crypto.randomUUID(),
                name: 'ADMIN'
            }));
        }

        const user = new User({
            name: data.name,
            cpf: new UniqueEntityCpf(data.cpf),
            email: data.email,
            password: data.password,
            companyId: data.companyId,
            types: [type.id],
            active: data.active
        });

        const createdUser = await this.userRepository.create(user);

        await this.createAdminUseCase.execute({
            cpf: data.cpf,
            name: data.name,
            type: "ADMIN"
        });

        return createdUser;
    }
} 