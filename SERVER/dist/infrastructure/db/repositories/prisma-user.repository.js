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
const user_1 = require("../../../domain/entities/user");
const unique_entity_cpf_1 = require("../../../core/entities/unique-entity-cpf");
let PrismaUserRepository = class PrismaUserRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(user) {
        try {
            const types = await Promise.all(user.types.map(async (typeName) => {
                const type = await this.prismaService.type.findUnique({
                    where: { name: typeName }
                });
                if (!type) {
                    throw new common_1.NotFoundException(`Tipo ${typeName} não encontrado.`);
                }
                return type;
            }));
            const createdUser = await this.prismaService.user.create({
                data: {
                    cpf: user.cpf.toString(),
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    companyId: user.companyId ?? null,
                    active: user.active ?? true,
                    types: {
                        create: types.map(type => ({
                            type: {
                                connect: {
                                    id: type.id
                                }
                            }
                        }))
                    }
                },
                include: {
                    types: {
                        include: {
                            type: true
                        }
                    }
                }
            });
            return new user_1.User({
                cpf: new unique_entity_cpf_1.default(createdUser.cpf),
                name: createdUser.name,
                email: createdUser.email,
                password: createdUser.password,
                companyId: createdUser.companyId ?? undefined,
                types: createdUser.types.map(t => t.type.name),
                active: createdUser.active
            });
        }
        catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }
    async update(cpf, user) {
        console.log('PrismaUserRepository - Atualizando usuário:', { cpf, user });
        if (user.types) {
            const types = await Promise.all(user.types.map(async (typeName) => {
                const type = await this.prismaService.type.findUnique({
                    where: { name: typeName }
                });
                if (!type) {
                    throw new common_1.NotFoundException(`Tipo ${typeName} não encontrado.`);
                }
                return type;
            }));
            await this.prismaService.userType.deleteMany({
                where: { userId: cpf }
            });
            await Promise.all(types.map(type => this.prismaService.userType.create({
                data: {
                    userId: cpf,
                    typeId: type.id
                }
            })));
        }
        const updatedUser = await this.prismaService.user.update({
            where: { cpf },
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                companyId: user.companyId,
                active: user.active
            },
            include: {
                types: {
                    include: {
                        type: true
                    }
                }
            }
        });
        return new user_1.User({
            cpf: new unique_entity_cpf_1.default(updatedUser.cpf),
            name: updatedUser.name,
            email: updatedUser.email,
            password: updatedUser.password,
            companyId: updatedUser.companyId || undefined,
            types: updatedUser.types.map(ut => ut.type.name),
            active: updatedUser.active
        });
    }
    async findAll() {
        const users = await this.prismaService.user.findMany({
            include: {
                types: true,
            },
        });
        return users.map((user) => new user_1.User({
            cpf: new unique_entity_cpf_1.default(user.cpf),
            name: user.name,
            email: user.email,
            password: user.password,
            companyId: user.companyId ?? '',
            types: user.types.map(ut => ut.typeId),
            active: user.active,
        }));
    }
    async findByEmail(email) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
            include: {
                types: {
                    include: {
                        type: true
                    }
                }
            }
        });
        if (!user) {
            return null;
        }
        return new user_1.User({
            cpf: new unique_entity_cpf_1.default(user.cpf),
            name: user.name,
            email: user.email,
            password: user.password,
            companyId: user.companyId ?? '',
            types: user.types.map(ut => ut.type.id),
            active: user.active,
        });
    }
    async findByCpf(cpf) {
        const user = await this.prismaService.user.findUnique({
            where: { cpf },
            include: {
                types: {
                    include: {
                        type: true
                    }
                }
            }
        });
        if (!user)
            return null;
        return new user_1.User({
            cpf: new unique_entity_cpf_1.default(user.cpf.toString()),
            name: user.name,
            email: user.email,
            password: user.password,
            companyId: user.companyId ?? '',
            types: user.types.map(ut => ut.type.id),
            active: user.active,
        });
    }
    async addType(cpf, typeId) {
        const user = await this.prismaService.user.findUnique({
            where: { cpf }
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuário com CPF ${cpf} não encontrado.`);
        }
        const existingType = await this.prismaService.userType.findFirst({
            where: {
                user: {
                    cpf: cpf
                },
                typeId: typeId
            }
        });
        if (existingType) {
            return;
        }
        await this.prismaService.userType.create({
            data: {
                user: {
                    connect: { cpf }
                },
                type: {
                    connect: { id: typeId }
                }
            }
        });
    }
    async delete(cpf) {
        await this.prismaService.user.delete({
            where: { cpf }
        });
    }
    async removeType(cpf, typeName) {
        const type = await this.prismaService.type.findUnique({
            where: { name: typeName }
        });
        if (!type) {
            throw new common_1.NotFoundException(`Tipo ${typeName} não encontrado.`);
        }
        await this.prismaService.userType.deleteMany({
            where: {
                userId: cpf,
                typeId: type.id
            }
        });
        switch (typeName.toUpperCase()) {
            case 'ADMIN':
                await this.prismaService.admin.deleteMany({
                    where: { cpf }
                });
                break;
            case 'EMPLOYEE':
                await this.prismaService.employee.deleteMany({
                    where: { cpf }
                });
                break;
        }
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUserRepository);
//# sourceMappingURL=prisma-user.repository.js.map