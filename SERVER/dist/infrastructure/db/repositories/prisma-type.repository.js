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
exports.PrismaTypeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/services/prisma.service");
const type_1 = require("../../../domain/entities/type");
const library_1 = require("@prisma/client/runtime/library");
let PrismaTypeRepository = class PrismaTypeRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(type) {
        try {
            const created = await this.prismaService.type.create({
                data: {
                    name: type.name,
                },
            });
            return new type_1.Type({ id: created.id, name: created.name });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                throw new common_1.ConflictException('Tipo já cadastrado.');
            }
            throw error;
        }
    }
    async findAll() {
        const types = await this.prismaService.type.findMany();
        return types.map((type) => new type_1.Type({ id: type.id, name: type.name }));
    }
    async findById(id) {
        if (!id) {
            throw new Error('ID do tipo não informado');
        }
        const type = await this.prismaService.type.findUnique({ where: { id } });
        if (!type)
            return null;
        return new type_1.Type({ id: type.id, name: type.name });
    }
    async findByName(name) {
        const type = await this.prismaService.type.findFirst({ where: { name } });
        if (!type)
            return null;
        return new type_1.Type({ id: type.id, name: type.name });
    }
};
exports.PrismaTypeRepository = PrismaTypeRepository;
exports.PrismaTypeRepository = PrismaTypeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaTypeRepository);
//# sourceMappingURL=prisma-type.repository.js.map