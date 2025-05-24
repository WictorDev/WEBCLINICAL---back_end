"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../domain/repositories/user.repository");
const type_repository_1 = require("../../domain/repositories/type.repository");
const create_admin_usecase_1 = require("../admin/create-admin.usecase");
const create_employee_usecase_1 = require("../employee/create-employee.usecase");
const delete_admin_usecase_1 = require("../admin/delete-admin.usecase");
const delete_employee_usecase_1 = require("../employee/delete-employee.usecase");
const employee_type_repository_1 = require("../../domain/repositories/employee-type.repository");
const employee_repository_1 = require("../../domain/repositories/employee.repository");
const prisma_service_1 = require("../../core/services/prisma.service");
const bcrypt = require("bcrypt");
let UpdateUserUseCase = class UpdateUserUseCase {
    userRepository;
    typeRepository;
    employeeTypeRepository;
    employeeRepository;
    createAdminUseCase;
    createEmployeeUseCase;
    deleteAdminUseCase;
    deleteEmployeeUseCase;
    prismaService;
    constructor(userRepository, typeRepository, employeeTypeRepository, employeeRepository, createAdminUseCase, createEmployeeUseCase, deleteAdminUseCase, deleteEmployeeUseCase, prismaService) {
        this.userRepository = userRepository;
        this.typeRepository = typeRepository;
        this.employeeTypeRepository = employeeTypeRepository;
        this.employeeRepository = employeeRepository;
        this.createAdminUseCase = createAdminUseCase;
        this.createEmployeeUseCase = createEmployeeUseCase;
        this.deleteAdminUseCase = deleteAdminUseCase;
        this.deleteEmployeeUseCase = deleteEmployeeUseCase;
        this.prismaService = prismaService;
    }
    async execute(cpf, data) {
        console.log('UpdateUserUseCase - Iniciando atualização com dados:', data);
        const existingUser = await this.userRepository.findByCpf(cpf.toString());
        if (!existingUser) {
            throw new common_1.BadRequestException("Usuário não encontrado.");
        }
        console.log('UpdateUserUseCase - Usuário encontrado:', existingUser);
        let updateData = { ...data };
        if (data.password) {
            updateData.password = await bcrypt.hash(data.password, 10);
        }
        else {
            delete updateData.password;
        }
        if (data.types) {
            console.log('UpdateUserUseCase - Tipos fornecidos:', data.types);
            const types = await Promise.all(data.types.map(async (typeName) => {
                const type = await this.typeRepository.findByName(typeName);
                if (!type) {
                    throw new common_1.BadRequestException(`Tipo ${typeName} não encontrado.`);
                }
                return type;
            }));
            const tiposAntigos = existingUser.types;
            const tiposNovos = data.types;
            let tiposAntigosNomes = tiposAntigos;
            if (tiposAntigos.length > 0 && tiposAntigos[0].length === 36) {
                const allTypes = await this.typeRepository.findAll();
                tiposAntigosNomes = tiposAntigos.map((id) => {
                    const found = allTypes.find((t) => t.id === id);
                    return found ? found.name : id;
                });
            }
            for (const tipo of tiposAntigosNomes) {
                if (!tiposNovos.includes(tipo)) {
                    await this.userRepository.removeType(cpf.toString(), tipo);
                }
            }
            if (data.types.includes('EMPLOYEE') && data.employeeTypeId) {
                const existingEmployee = await this.employeeRepository.findByCpf(cpf.toString());
                if (existingEmployee) {
                    await this.employeeRepository.update(cpf.toString(), {
                        name: data.name || existingUser.name,
                        typeId: types.find(t => t.name === 'EMPLOYEE')?.id || '',
                        employeeTypeId: data.employeeTypeId,
                        advice: data.advice
                    });
                }
                else {
                    await this.createEmployeeUseCase.execute({
                        cpf: cpf.toString(),
                        name: data.name || existingUser.name,
                        type: 'EMPLOYEE',
                        employeeTypeId: data.employeeTypeId,
                        advice: data.advice
                    });
                }
            }
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
                    }
                    catch (error) {
                        if (error.code === 'P2002') {
                            await this.prismaService.admin.update({
                                where: { cpf: cpf.toString() },
                                data: {
                                    name: data.name || existingUser.name,
                                    typeId: types.find(t => t.name === 'ADMIN')?.id || ''
                                }
                            });
                        }
                        else {
                            throw error;
                        }
                    }
                }
            }
            await this.userRepository.update(cpf.toString(), {
                ...updateData,
                types: data.types
            });
        }
        else {
            await this.userRepository.update(cpf.toString(), updateData);
        }
        const updatedUser = await this.userRepository.findByCpf(cpf.toString());
        if (!updatedUser) {
            throw new common_1.BadRequestException("Erro ao atualizar usuário.");
        }
        return updatedUser;
    }
    async createInSpecificTable(typeName, data) {
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
                throw new common_1.BadRequestException(`Tipo ${typeName} não suportado`);
        }
    }
    async removeFromSpecificTable(typeName, cpf) {
        console.log('UpdateUserUseCase - Removendo de tabela específica:', typeName, cpf);
        switch (typeName.toUpperCase()) {
            case 'ADMIN':
                await this.deleteAdminUseCase.execute(cpf);
                break;
            case 'EMPLOYEE':
                await this.deleteEmployeeUseCase.execute(cpf);
                break;
            default:
                throw new common_1.BadRequestException(`Tipo ${typeName} não suportado`);
        }
    }
};
exports.UpdateUserUseCase = UpdateUserUseCase;
exports.UpdateUserUseCase = UpdateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        type_repository_1.TypeRepository,
        employee_type_repository_1.EmployeeTypeRepository,
        employee_repository_1.EmployeeRepository,
        create_admin_usecase_1.CreateAdminUseCase,
        create_employee_usecase_1.CreateEmployeeUseCase,
        delete_admin_usecase_1.DeleteAdminUseCase,
        delete_employee_usecase_1.DeleteEmployeeUseCase,
        prisma_service_1.PrismaService])
], UpdateUserUseCase);
//# sourceMappingURL=update-user.usecase.js.map