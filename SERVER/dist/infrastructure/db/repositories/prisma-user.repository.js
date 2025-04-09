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
let PrismaUserRepository = class PrismaUserRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(user) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const createdUser = await this.prismaService.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashedPassword,
                cpf: user.cpf.toString(),
                companyId: user.companyId ?? undefined,
                typeId: user.typeId ?? undefined,
                active: user.active ?? true,
            },
        });
        return new user_1.User({
            ...createdUser,
            cpf: new unique_entity_cpf_1.default(createdUser.cpf),
            companyId: createdUser.companyId ?? undefined,
            typeId: createdUser.typeId ?? undefined,
        });
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
                companyId: user.companyId ?? undefined,
                typeId: user.typeId ?? undefined,
                active: user.active ?? true
            }
        });
        return new user_1.User({
            ...updatedUser,
            cpf: new unique_entity_cpf_1.default(updatedUser.cpf.toString()),
            companyId: updatedUser.companyId ?? undefined,
            typeId: updatedUser.typeId ?? undefined,
        });
    }
    async findAll() {
        const users = await this.prismaService.user.findMany();
        return users.map((user) => {
            return new user_1.User({
                cpf: new unique_entity_cpf_1.default(user.cpf.toString()),
                name: user.name,
                email: user.email,
                password: user.password,
                companyId: user.companyId ?? undefined,
                typeId: user.typeId ?? undefined,
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
            companyId: user.companyId ?? undefined,
            typeId: user.typeId ?? undefined,
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
            companyId: user.companyId ?? undefined,
            typeId: user.typeId ?? undefined,
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