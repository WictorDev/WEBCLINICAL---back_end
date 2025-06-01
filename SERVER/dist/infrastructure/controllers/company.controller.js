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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/jwt.guard");
const create_company_usecase_1 = require("../../use-case/company/create-company.usecase");
const update_company_usecase_1 = require("../../use-case/company/update-company.usecase");
const findByEmail_usecase_1 = require("../../use-case/company/findByEmail.usecase");
const findByCnpj_company_usecase_1 = require("../../use-case/company/findByCnpj-company.usecase");
const find_company_usecase_1 = require("../../use-case/company/find-company.usecase");
const unique_entity_cnpj_1 = require("../../core/entities/unique-entity-cnpj");
const public_decorator_1 = require("../auth/public.decorator");
let CompanyController = class CompanyController {
    createCompanyUseCase;
    updateCompanyUseCase;
    findCompanyByEmailUseCase;
    findCompanyByCnpjUseCase;
    findCompanyUseCase;
    constructor(createCompanyUseCase, updateCompanyUseCase, findCompanyByEmailUseCase, findCompanyByCnpjUseCase, findCompanyUseCase) {
        this.createCompanyUseCase = createCompanyUseCase;
        this.updateCompanyUseCase = updateCompanyUseCase;
        this.findCompanyByEmailUseCase = findCompanyByEmailUseCase;
        this.findCompanyByCnpjUseCase = findCompanyByCnpjUseCase;
        this.findCompanyUseCase = findCompanyUseCase;
    }
    async findAll() {
        return this.findCompanyUseCase.execute();
    }
    async findByEmail(email) {
        return this.findCompanyByEmailUseCase.execute(email);
    }
    async findByCnpj(cnpj) {
        return this.findCompanyByCnpjUseCase.execute(new unique_entity_cnpj_1.UniqueEntityCnpj(cnpj));
    }
    async create(body) {
        try {
            return await this.createCompanyUseCase.execute({
                ...body,
                cnpj: new unique_entity_cnpj_1.UniqueEntityCnpj(body.cnpj)
            });
        }
        catch (error) {
            if (error.message && error.message.includes('CNPJ')) {
                throw new common_1.BadRequestException(error.message);
            }
            throw error;
        }
    }
    async update(cnpj, body) {
        return this.updateCompanyUseCase.execute(new unique_entity_cnpj_1.UniqueEntityCnpj(cnpj), body);
    }
    async createFirstCompany(body) {
        const companies = await this.findCompanyUseCase.execute();
        if (companies && companies.length > 0) {
            throw new common_1.BadRequestException('Já existe uma companhia cadastrada.');
        }
        try {
            return await this.createCompanyUseCase.execute({
                ...body,
                cnpj: new unique_entity_cnpj_1.UniqueEntityCnpj(body.cnpj)
            });
        }
        catch (error) {
            if (error.message && error.message.includes('CNPJ')) {
                throw new common_1.BadRequestException(error.message);
            }
            throw error;
        }
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Get)('cnpj/:cnpj'),
    __param(0, (0, common_1.Param)('cnpj')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "findByCnpj", null);
__decorate([
    (0, common_1.Post)('/create_company'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':cnpj'),
    __param(0, (0, common_1.Param)('cnpj')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "update", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/create_first_company'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "createFirstCompany", null);
exports.CompanyController = CompanyController = __decorate([
    (0, swagger_1.ApiTags)('companies'),
    (0, common_1.Controller)('/api/companies'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [create_company_usecase_1.CreateCompanyUseCase,
        update_company_usecase_1.UpdateCompanyUseCase,
        findByEmail_usecase_1.FindCompanyByEmailUseCase,
        findByCnpj_company_usecase_1.FindCompanyByCnpjUseCase,
        find_company_usecase_1.FindCompanyUseCase])
], CompanyController);
//# sourceMappingURL=company.controller.js.map