import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
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
        name: string;
        cpf: string;
        email: string;
        password: string;
        types: string[];
        companyId: string;
        active?: boolean;
        employeeTypeId?: string;
        advice?: string;
    }) {
        // Verifica se o usuário já existe
        const existingUser = await this.userRepository.findByCpf(data.cpf);
        if (existingUser) {
            throw new ConflictException('CPF já cadastrado.');
        }

        // Verifica se o email já existe
        const existingEmail = await this.userRepository.findByEmail(data.email);
        if (existingEmail) {
            throw new ConflictException('E-mail já cadastrado.');
        }

        // Verifica e obtém os tipos
        const types = await Promise.all(
            data.types.map(async (typeName) => {
                const type = await this.typeRepository.findByName(typeName);
                if (!type) {
                    throw new BadRequestException(`Tipo ${typeName} não encontrado.`);
                }
                return type;
            })
        );

        // Hash da senha
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Cria o usuário
        const user = new User({
            cpf: new UniqueEntityCpf(data.cpf),
            name: data.name,
            email: data.email,
            password: hashedPassword,
            companyId: data.companyId,
            types: data.types,
            active: data.active ?? true,
        });

        const createdUser = await this.userRepository.create(user);

        // Cria registros nas tabelas específicas para cada tipo
        for (const type of types) {
            await this.createInSpecificTable(type.name, {
                cpf: data.cpf,
                name: data.name,
                email: data.email,
                password: hashedPassword,
                type: type.name,
                employeeTypeId: data.employeeTypeId,
                advice: data.advice
            });
        }

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
        if (!typeName) return;

        switch (typeName.toUpperCase()) {
            case 'ADMIN':
                await this.createAdminUseCase.execute({
                    cpf: data.cpf,
                    name: data.name,
                    type: typeName
                });
                break;

            case 'EMPLOYEE':
                await this.createEmployeeUseCase.execute({
                    cpf: data.cpf,
                    name: data.name,
                    type: typeName,
                    employeeTypeId: data.employeeTypeId,
                    advice: data.advice
                });
                break;

            default:
                throw new BadRequestException(`Tipo ${typeName} não suportado`);
        }
    }
} 