import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { User } from 'src/domain/entities/user';
import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly typeRepository: TypeRepository,
    ) { }

    async execute(data: { 
        name: string, 
        cpf: string, 
        email: string, 
        password: string, 
        companyId: string, 
        type: string, 
        active: boolean,
        employeeTypeId?: string 
    }) {
        // Busca o tipo pelo nome
        const type = await this.typeRepository.findByName(data.type);
        if (!type) {
            throw new BadRequestException(`Tipo ${data.type} não encontrado.`);
        }

        // Verifica se já existe um usuário com o mesmo CPF
        const existingUserByCpf = await this.userRepository.findByCpf(data.cpf);
        // Verifica se já existe um usuário com o mesmo email
        const existingUserByEmail = await this.userRepository.findByEmail(data.email);

        // Se encontrou usuário com mesmo CPF ou email
        const existingUser = existingUserByCpf || existingUserByEmail;
        if (existingUser) {            
            // Verifica se o tipo já existe para o usuário
            if (!existingUser.types.includes(type.id)) {
                // Adiciona o novo tipo ao array de tipos existente
                const updatedTypes = [...existingUser.types, type.id];
                
                // Atualiza o usuário com o novo array de tipos
                const updatedUser = await this.userRepository.update(
                    existingUser.cpf.toString(),
                    { types: updatedTypes }
                );

                return updatedUser;
            }
            
            return existingUser; // Retorna o usuário sem alterações se o tipo já existir
        }

        // Se não encontrou usuário existente, cria um novo
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = new User({
            name: data.name,
            cpf: new UniqueEntityCpf(data.cpf),
            email: data.email,
            password: hashedPassword,
            companyId: data.companyId,
            types: [type.id],
            active: data.active
        });

        const createdUser = await this.userRepository.create(user);

        return createdUser;
    }
} 