import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { User } from 'src/domain/entities/user';
import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';
import * as bcrypt from 'bcrypt';
import { CreateAdminUseCase } from '../admin/create-admin.usecase';
import { CreateEmployeeUseCase } from '../employee/create-employee.usecase';

@Injectable()
export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly typeRepository: TypeRepository,
        private readonly createAdminUseCase: CreateAdminUseCase,
        private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    ) { }

    async execute(data: { 
        name: string, 
        cpf: string, 
        email: string, 
        password: string, 
        companyId: string, 
        type: string, 
        active: boolean,
        employeeTypeId?: string,
        advice?: string
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

                // Cria o registro na tabela específica do tipo
                await this.createInSpecificTable(data.type, {
                    cpf: existingUser.cpf.toString(),
                    name: existingUser.name,
                    email: existingUser.email,
                    password: existingUser.password,
                    type: type.id,
                    employeeTypeId: data.employeeTypeId || undefined,
                    advice: data.advice
                });

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

        // Cria o registro na tabela específica do tipo
        await this.createInSpecificTable(data.type, {
            cpf: data.cpf,
            name: data.name,
            email: data.email,
            password: hashedPassword,
            type: type.id,
            employeeTypeId: data.employeeTypeId || undefined,
            advice: data.advice
        });

        return createdUser;
    }

    private async createInSpecificTable(typeName: string, data: {
        cpf: string,
        name: string,
        email: string,
        password: string,
        type: string,
        employeeTypeId?: string,
        advice?: string
    }) {
        switch (typeName.toUpperCase()) {
            case 'ADMIN':
                await this.createAdminUseCase.execute({
                    cpf: data.cpf,
                    name: data.name,
                    type: typeName // O tipo será buscado dentro do createAdminUseCase
                });
                break;

            case 'EMPLOYEE':
                const result = await this.createEmployeeUseCase.execute({
                    cpf: data.cpf,
                    name: data.name,
                    type: typeName,
                    employeeTypeId: data.employeeTypeId,
                    advice: data.advice
                });
                return result;

            default:
                throw new BadRequestException(`Tipo ${typeName} não suportado`);
        }
    }
} 