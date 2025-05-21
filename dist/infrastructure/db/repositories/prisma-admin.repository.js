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
exports.PrismaAdminRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/services/prisma.service");
const admin_1 = require("../../../domain/entities/admin");
const library_1 = require("@prisma/client/runtime/library");
const unique_entity_cpf_1 = require("../../../core/entities/unique-entity-cpf");
let PrismaAdminRepository = class PrismaAdminRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            let type = await this.prisma.type.findFirst({
                where: { name: data.type }
            });
            if (!type) {
                type = await this.prisma.type.create({
                    data: { name: data.type }
                });
            }
            const admin = await this.prisma.admin.create({
                data: {
                    cpf: data.cpf.toString(),
                    name: data.name,
                    typeId: type.id
                },
                include: {
                    type: true
                }
            });
            return new admin_1.Admin({
                cpf: new unique_entity_cpf_1.default(admin.cpf),
                name: admin.name,
                type: admin.type.name
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new common_1.ConflictException('CPF já cadastrado.');
            }
            throw error;
        }
    }
    async update(cpf, data) {
        try {
            const admin = await this.prisma.admin.update({
                where: { cpf },
                data: {
                    name: data.name
                },
                include: {
                    type: true
                }
            });
            return new admin_1.Admin({
                cpf: new unique_entity_cpf_1.default(admin.cpf),
                name: admin.name,
                type: admin.type.name
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new common_1.ConflictException('Admin não encontrado.');
            }
            throw error;
        }
    }
    async findByCpf(cpf) {
        const admin = await this.prisma.admin.findUnique({
            where: { cpf },
            include: {
                type: true
            }
        });
        if (!admin)
            return null;
        return new admin_1.Admin({
            cpf: new unique_entity_cpf_1.default(admin.cpf),
            name: admin.name,
            type: admin.type.name
        });
    }
    async findAll() {
        const admins = await this.prisma.admin.findMany({
            include: {
                type: true
            }
        });
        return admins.map(admin => new admin_1.Admin({
            cpf: new unique_entity_cpf_1.default(admin.cpf),
            name: admin.name,
            type: admin.type.name
        }));
    }
};
exports.PrismaAdminRepository = PrismaAdminRepository;
exports.PrismaAdminRepository = PrismaAdminRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAdminRepository);
//# sourceMappingURL=prisma-admin.repository.js.map