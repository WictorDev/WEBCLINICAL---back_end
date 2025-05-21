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
exports.PrismaUserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/services/prisma.service");
const bcrypt = require("bcryptjs");
const user_1 = require("../../../domain/entities/user");
const unique_entity_cpf_1 = require("../../../core/entities/unique-entity-cpf");
const library_1 = require("@prisma/client/runtime/library");
let PrismaUserRepository = class PrismaUserRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(user) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        try {
            const createdUser = await this.prismaService.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: hashedPassword,
                    cpf: user.cpf.toString(),
                    companyId: user.companyId,
                    typeId: user.type,
                    active: user.active ?? true,
                },
            });
            const userType = await this.prismaService.type.findUnique({
                where: { id: user.type }
            });
            if (userType && userType.name === 'Admin') {
                try {
                    const existingAdmin = await this.prismaService.admin.findUnique({
                        where: { Cpf: user.cpf.toString() }
                    });
                    if (!existingAdmin) {
                        await this.prismaService.admin.create({
                            data: {
                                Cpf: user.cpf.toString(),
                                name: user.name,
                                typeId: user.type
                            }
                        });
                        console.log(`Registro de Admin criado automaticamente para o usuário ${user.name} (CPF: ${user.cpf.toString()})`);
                    }
                }
                catch (adminError) {
                    console.error('Erro ao criar registro de Admin:', adminError);
                }
            }
            else if (userType && userType.name === 'Employee') {
                try {
                    const existingEmployee = await this.prismaService.employee.findUnique({
                        where: { cpf: user.cpf.toString() }
                    });
                    if (!existingEmployee) {
                        const defaultEmployeeType = await this.prismaService.employeeType.findFirst();
                        if (!defaultEmployeeType) {
                            console.error('Não foi possível encontrar um EmployeeType padrão para o funcionário');
                            throw new Error('EmployeeType não encontrado');
                        }
                        await this.prismaService.employee.create({
                            data: {
                                cpf: user.cpf.toString(),
                                name: user.name,
                                typeId: user.type,
                                employeeTypeId: defaultEmployeeType.id
                            }
                        });
                        console.log(`Registro de Employee criado automaticamente para o usuário ${user.name} (CPF: ${user.cpf.toString()})`);
                    }
                }
                catch (employeeError) {
                    console.error('Erro ao criar registro de Employee:', employeeError);
                }
            }
            return new user_1.User({
                ...createdUser,
                cpf: new unique_entity_cpf_1.default(createdUser.cpf),
                companyId: createdUser.companyId ?? '',
                type: createdUser.typeId ?? '',
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                const target = error.meta?.target;
                if (Array.isArray(target)) {
                    if (target.includes('email')) {
                        throw new common_1.ConflictException('E-mail já cadastrado.');
                    }
                    if (target.includes('cpf')) {
                        throw new common_1.ConflictException('CPF já cadastrado.');
                    }
                }
                else if (typeof target === 'string') {
                    if (target.includes('email')) {
                        throw new common_1.ConflictException('E-mail já cadastrado.');
                    }
                    if (target.includes('cpf')) {
                        throw new common_1.ConflictException('CPF já cadastrado.');
                    }
                }
                throw new common_1.ConflictException('E-mail ou CPF já cadastrado.');
            }
            throw error;
        }
    }
    async update(cpf, user) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 4);
        }
        const updatedUser = await this.prismaService.user.update({
            where: { cpf: cpf.toString() },
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                companyId: user.companyId,
                typeId: user.type,
                active: user.active ?? true
            }
        });
        if (user.type) {
            const userType = await this.prismaService.type.findUnique({
                where: { id: user.type }
            });
            if (userType && userType.name === 'Admin') {
                try {
                    const existingAdmin = await this.prismaService.admin.findUnique({
                        where: { Cpf: cpf.toString() }
                    });
                    if (!existingAdmin) {
                        await this.prismaService.admin.create({
                            data: {
                                Cpf: cpf.toString(),
                                name: updatedUser.name,
                                typeId: user.type
                            }
                        });
                        console.log(`Registro de Admin criado automaticamente para o usuário ${updatedUser.name} (CPF: ${cpf})`);
                    }
                }
                catch (adminError) {
                    console.error('Erro ao criar registro de Admin durante atualização:', adminError);
                }
            }
            else if (userType && userType.name === 'Employee') {
                try {
                    const existingEmployee = await this.prismaService.employee.findUnique({
                        where: { cpf: cpf.toString() }
                    });
                    if (!existingEmployee) {
                        const defaultEmployeeType = await this.prismaService.employeeType.findFirst();
                        if (!defaultEmployeeType) {
                            console.error('Não foi possível encontrar um EmployeeType padrão para o funcionário');
                            throw new Error('EmployeeType não encontrado');
                        }
                        await this.prismaService.employee.create({
                            data: {
                                cpf: cpf.toString(),
                                name: updatedUser.name,
                                typeId: user.type,
                                employeeTypeId: defaultEmployeeType.id
                            }
                        });
                        console.log(`Registro de Employee criado automaticamente para o usuário ${updatedUser.name} (CPF: ${cpf})`);
                    }
                }
                catch (employeeError) {
                    console.error('Erro ao criar registro de Employee durante atualização:', employeeError);
                }
            }
        }
        return new user_1.User({
            ...updatedUser,
            cpf: new unique_entity_cpf_1.default(updatedUser.cpf.toString()),
            companyId: updatedUser.companyId ?? '',
            type: updatedUser.typeId ?? '',
        });
    }
    async findAll() {
        const users = await this.prismaService.user.findMany();
        return users.map((user) => {
            return new user_1.User({
                cpf: new unique_entity_cpf_1.default(user.cpf),
                name: user.name,
                email: user.email,
                password: user.password,
                companyId: user.companyId ?? '',
                type: user.typeId ?? '',
                active: user.active,
            });
        });
    }
    async findByEmail(email) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });
        if (!user) {
            return null;
        }
        return new user_1.User({
            cpf: new unique_entity_cpf_1.default(user.cpf.toString()),
            name: user.name,
            email: user.email,
            password: user.password,
            companyId: user.companyId ?? '',
            type: user.typeId ?? '',
            active: user.active,
        });
    }
    async findByCpf(cpf) {
        const user = await this.prismaService.user.findUnique({
            where: { cpf },
        });
        if (!user)
            return null;
        return new user_1.User({
            cpf: new unique_entity_cpf_1.default(user.cpf.toString()),
            name: user.name,
            email: user.email,
            password: user.password,
            companyId: user.companyId ?? '',
            type: user.typeId ?? '',
            active: user.active,
        });
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUserRepository);
//# sourceMappingURL=prisma-user.repository.js.map