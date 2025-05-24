import { Injectable, BadRequestException } from "@nestjs/common";
import UniqueEntitycpf from "src/core/entities/unique-entity-cpf";
import { UserRepository } from "src/domain/repositories/user.repository";
import { TypeRepository } from "src/domain/repositories/type.repository";
import { CreateAdminUseCase } from "../admin/create-admin.usecase";
import { CreateEmployeeUseCase } from "../employee/create-employee.usecase";
import { DeleteAdminUseCase } from "../admin/delete-admin.usecase";
import { DeleteEmployeeUseCase } from "../employee/delete-employee.usecase";
import { EmployeeTypeRepository } from "src/domain/repositories/employee-type.repository";
import { EmployeeRepository } from "src/domain/repositories/employee.repository";
import { PrismaService } from "src/core/services/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private typeRepository: TypeRepository,
        private employeeTypeRepository: EmployeeTypeRepository,
        private employeeRepository: EmployeeRepository,
        private createAdminUseCase: CreateAdminUseCase,
        private createEmployeeUseCase: CreateEmployeeUseCase,
        private deleteAdminUseCase: DeleteAdminUseCase,
        private deleteEmployeeUseCase: DeleteEmployeeUseCase,
        private prismaService: PrismaService
    ) { }

    async execute(
        cpf: UniqueEntitycpf,
        data: {
            name?: string;
            email?: string;
            password?: string;
            types?: string[];
            companyId?: string;
            active?: boolean;
            employeeTypeId?: string;
            advice?: string;
        }
    ) {
        console.log('UpdateUserUseCase - Iniciando atualização com dados:', data);
        const existingUser = await this.userRepository.findByCpf(cpf.toString());

        if (!existingUser) {
            throw new BadRequestException("Usuário não encontrado.");
        }
        console.log('UpdateUserUseCase - Usuário encontrado:', existingUser);

        let updateData = { ...data };

        // Se uma nova senha for fornecida, faz o hash
        if (data.password) {
            updateData.password = await bcrypt.hash(data.password, 10);
        } else {
            // Se não for fornecida uma nova senha, mantém a senha atual
            delete updateData.password;
        }

        if (data.types) {
            console.log('UpdateUserUseCase - Tipos fornecidos:', data.types);
            
            // Primeiro, busca os tipos pelo nome
            const types = await Promise.all(
                data.types.map(async (typeName) => {
                    const type = await this.typeRepository.findByName(typeName);
                    if (!type) {
                        throw new BadRequestException(`Tipo ${typeName} não encontrado.`);
                    }
                    return type;
                })
            );

            // --- NOVO: Remover tipos antigos que não estão mais presentes ---
            const tiposAntigos = existingUser.types;
            const tiposNovos = data.types;
            // Se os tipos antigos são nomes, ok. Se são IDs, buscar nomes:
            let tiposAntigosNomes = tiposAntigos;
            if (tiposAntigos.length > 0 && tiposAntigos[0].length === 36) { // UUID
                const allTypes = await this.typeRepository.findAll();
                tiposAntigosNomes = tiposAntigos.map((id: string) => {
                    const found = allTypes.find((t: any) => t.id === id);
                    return found ? found.name : id;
                });
            }
            for (const tipo of tiposAntigosNomes) {
                if (!tiposNovos.includes(tipo)) {
                    await this.userRepository.removeType(cpf.toString(), tipo);
                }
            }
            // --- FIM NOVO ---

            // Verifica se precisa atualizar o Employee
            if (data.types.includes('EMPLOYEE') && data.employeeTypeId) {
                const existingEmployee = await this.employeeRepository.findByCpf(cpf.toString());
                if (existingEmployee) {
                    // Atualiza o Employee existente
                    await this.employeeRepository.update(cpf.toString(), {
                        name: data.name || existingUser.name,
                        typeId: types.find(t => t.name === 'EMPLOYEE')?.id || '',
                        employeeTypeId: data.employeeTypeId,
                        advice: data.advice
                    });
                } else {
                    // Cria um novo Employee
                    await this.createEmployeeUseCase.execute({
                        cpf: cpf.toString(),
                        name: data.name || existingUser.name,
                        type: 'EMPLOYEE',
                        employeeTypeId: data.employeeTypeId,
                        advice: data.advice
                    });
                }
            }

            // Verifica se precisa criar/atualizar Admin
            if (data.types.includes('ADMIN')) {
                const existingAdmin = await this.userRepository.findByCpf(cpf.toString());
                const isAdmin = existingAdmin?.types.some(t => t === 'ADMIN');
                
                if (!isAdmin) {
                    try {
                        await this.createAdminUseCase.execute({
                            cpf: cpf.toString(),
                            name: data.name || existingUser.name,
                            type: 'ADMIN'
                        });
                    } catch (error) {
                        if (error.code === 'P2002') {
                            // Se já existe um admin com este CPF, apenas atualiza
                            await this.prismaService.admin.update({
                                where: { cpf: cpf.toString() },
                                data: {
                                    name: data.name || existingUser.name,
                                    typeId: types.find(t => t.name === 'ADMIN')?.id || ''
                                }
                            });
                        } else {
                            throw error;
                        }
                    }
                }
            }

            // Atualiza os tipos do usuário
            await this.userRepository.update(cpf.toString(), {
                ...updateData,
                types: data.types
            });
        } else {
            // Se não houver tipos para atualizar, apenas atualiza os outros dados
            await this.userRepository.update(cpf.toString(), updateData);
        }

        // Busca o usuário atualizado para retornar
        const updatedUser = await this.userRepository.findByCpf(cpf.toString());
        if (!updatedUser) {
            throw new BadRequestException("Erro ao atualizar usuário.");
        }

        return updatedUser;
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
        console.log('UpdateUserUseCase - Criando em tabela específica:', typeName, data);
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

    private async removeFromSpecificTable(typeName: string, cpf: string) {
        console.log('UpdateUserUseCase - Removendo de tabela específica:', typeName, cpf);
        switch (typeName.toUpperCase()) {
            case 'ADMIN':
                await this.deleteAdminUseCase.execute(cpf);
                break;

            case 'EMPLOYEE':
                await this.deleteEmployeeUseCase.execute(cpf);
                break;

            default:
                throw new BadRequestException(`Tipo ${typeName} não suportado`);
        }
    }
}

