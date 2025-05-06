"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma.module");
const company_controller_1 = require("../controllers/company.controller");
const prisma_company_repository_1 = require("../db/repositories/prisma-company.repository");
const company_repository_1 = require("../../domain/repositories/company.repository");
const create_company_usecase_1 = require("../../use-case/company/create-company.usecase");
const findByEmail_usecase_1 = require("../../use-case/company/findByEmail.usecase");
const find_company_usecase_1 = require("../../use-case/company/find-company.usecase");
const findByCnpj_company_usecase_1 = require("../../use-case/company/findByCnpj-company.usecase");
const update_company_usecase_1 = require("../../use-case/company/update-company.usecase");
let CompanyModule = class CompanyModule {
};
exports.CompanyModule = CompanyModule;
exports.CompanyModule = CompanyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRATION') || '1h',
                    },
                }),
            }),
        ],
        controllers: [company_controller_1.CompanyController],
        providers: [
            {
                provide: company_repository_1.CompanyRepository,
                useClass: prisma_company_repository_1.PrismaCompanyRepository,
            },
            prisma_company_repository_1.PrismaCompanyRepository,
            create_company_usecase_1.CreateCompanyUseCase,
            update_company_usecase_1.UpdateCompanyUseCase,
            find_company_usecase_1.FindCompanyUseCase,
            findByEmail_usecase_1.FindCompanyByEmailUseCase,
            findByCnpj_company_usecase_1.FindCompanyByCnpjUseCase
        ],
        exports: [
            company_repository_1.CompanyRepository,
            prisma_company_repository_1.PrismaCompanyRepository,
            create_company_usecase_1.CreateCompanyUseCase,
            update_company_usecase_1.UpdateCompanyUseCase,
            find_company_usecase_1.FindCompanyUseCase,
            findByEmail_usecase_1.FindCompanyByEmailUseCase,
        ],
    })
], CompanyModule);
//# sourceMappingURL=company.module.js.map