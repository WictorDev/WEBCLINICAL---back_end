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
exports.PrismaCompanyRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/services/prisma.service");
const company_1 = require("../../../domain/entities/company");
const unique_entity_cnpj_1 = require("../../../core/entities/unique-entity-cnpj");
const library_1 = require("@prisma/client/runtime/library");
let PrismaCompanyRepository = class PrismaCompanyRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    removeCnpjFormat(cnpj) {
        return cnpj.replace(/[^\d]/g, '');
    }
    async create(company) {
        try {
            const created = await this.prismaService.company.create({
                data: {
                    Cnpj: company.cnpj,
                    name: company.name,
                    phone: company.phone,
                    email: company.email,
                },
            });
            return new company_1.Company({
                cnpj: new unique_entity_cnpj_1.UniqueEntityCnpj(created.Cnpj),
                name: created.name,
                phone: created.phone,
                email: created.email,
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                const target = error.meta?.target;
                if (Array.isArray(target)) {
                    if (target.includes('Cnpj')) {
                        throw new common_1.ConflictException('CNPJ já cadastrado.');
                    }
                    if (target.includes('email')) {
                        throw new common_1.ConflictException('E-mail já cadastrado.');
                    }
                }
                else if (typeof target === 'string') {
                    if (target.includes('Cnpj')) {
                        throw new common_1.ConflictException('CNPJ já cadastrado.');
                    }
                    if (target.includes('email')) {
                        throw new common_1.ConflictException('E-mail já cadastrado.');
                    }
                }
                throw new common_1.ConflictException('CNPJ ou e-mail já cadastrado.');
            }
            throw error;
        }
    }
    async findAll() {
        const companies = await this.prismaService.company.findMany();
        return companies.map((company) => {
            return new company_1.Company({
                name: company.name,
                cnpj: new unique_entity_cnpj_1.UniqueEntityCnpj(company.Cnpj),
                email: company.email,
                phone: company.phone,
            });
        });
    }
    async findByEmail(email) {
        const company = await this.prismaService.company.findUnique({
            where: { email }
        });
        if (!company)
            return null;
        return new company_1.Company({
            name: company.name,
            cnpj: new unique_entity_cnpj_1.UniqueEntityCnpj(company.Cnpj),
            email: company.email,
            phone: company.phone,
        });
    }
    async findByCnpj(cnpj) {
        const company = await this.prismaService.company.findUnique({
            where: { Cnpj: this.removeCnpjFormat(cnpj) }
        });
        if (!company)
            return null;
        return new company_1.Company({
            name: company.name,
            cnpj: new unique_entity_cnpj_1.UniqueEntityCnpj(company.Cnpj),
            email: company.email,
            phone: company.phone,
        });
    }
    async update(Cnpj, data) {
        const updatedCompany = await this.prismaService.company.update({
            where: { Cnpj },
            data,
        });
        return new company_1.Company({
            name: updatedCompany.name,
            cnpj: new unique_entity_cnpj_1.UniqueEntityCnpj(updatedCompany.Cnpj),
            email: updatedCompany.email,
            phone: updatedCompany.phone,
        });
    }
    async findByName(name) {
        const company = await this.prismaService.company.findFirst({
            where: { name },
        });
        if (!company)
            return null;
        return new company_1.Company({
            name: company.name,
            cnpj: new unique_entity_cnpj_1.UniqueEntityCnpj(company.Cnpj),
            email: company.email,
            phone: company.phone,
        });
    }
};
exports.PrismaCompanyRepository = PrismaCompanyRepository;
exports.PrismaCompanyRepository = PrismaCompanyRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaCompanyRepository);
//# sourceMappingURL=prisma-company.repository.js.map