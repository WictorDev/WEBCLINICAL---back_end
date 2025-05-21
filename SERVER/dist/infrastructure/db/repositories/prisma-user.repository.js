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
const bcrypt = require("bcrypt");
const user_1 = require("../../../domain/entities/user");
const unique_entity_cpf_1 = require("../../../core/entities/unique-entity-cpf");
const library_1 = require("@prisma/client/runtime/library");
let PrismaUserRepository = class PrismaUserRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(user) {
        let password = user.password;
        if (!password.startsWith('$2b$')) {
            password = await bcrypt.hash(user.password, 10);
        }
        try {
            const createdUser = await this.prismaService.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: password,
                    cpf: user.cpf.toString(),
                    companyId: user.companyId,
                    types: {
                        create: user.types.map(typeId => ({
                            type: {
                                connect: { id: typeId }
                            }
                        }))
                    },
                    active: user.active ?? true,
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
                ...createdUser,
                cpf: new unique_entity_cpf_1.default(createdUser.cpf),
                companyId: createdUser.companyId ?? '',
                types: createdUser.types.map(ut => ut.type.id),
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
        let password = user.password;
        if (password && !password.startsWith('$2b$')) {
            password = await bcrypt.hash(password, 10);
        }
        const updateData = {
            name: user.name,
            email: user.email,
            password: password,
            companyId: user.companyId,
            active: user.active ?? true
        };
        if (user.types) {
            updateData.types = {
                deleteMany: {},
                create: user.types.map(typeId => ({
                    type: {
                        connect: { id: typeId }
                    }
                }))
            };
        }
        const updatedUser = await this.prismaService.user.update({
            where: { cpf: cpf.toString() },
            data: updateData,
            include: {
                types: {
                    include: {
                        type: true
                    }
                }
            }
        });
        return new user_1.User({
            ...updatedUser,
            cpf: new unique_entity_cpf_1.default(updatedUser.cpf.toString()),
            companyId: updatedUser.companyId ?? '',
            types: updatedUser.types.map(ut => ut.type.id),
        });
    }
    async findAll() {
        const users = await this.prismaService.user.findMany({
            include: {
                types: {
                    include: {
                        type: true
                    }
                }
            }
        });
        return users.map((user) => {
            return new user_1.User({
                cpf: new unique_entity_cpf_1.default(user.cpf),
                name: user.name,
                email: user.email,
                password: user.password,
                companyId: user.companyId ?? '',
                types: user.types.map(ut => ut.type.id),
                active: user.active,
            });
        });
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
            cpf: new unique_entity_cpf_1.default(user.cpf.toString()),
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
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUserRepository);
//# sourceMappingURL=prisma-user.repository.js.map