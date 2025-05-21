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
var PrismaEmployeeTypeRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaEmployeeTypeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/services/prisma.service");
const employee_type_1 = require("../../../domain/entities/employee-type");
let PrismaEmployeeTypeRepository = PrismaEmployeeTypeRepository_1 = class PrismaEmployeeTypeRepository {
    prismaService;
    logger = new common_1.Logger(PrismaEmployeeTypeRepository_1.name);
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(employeeType) {
        this.logger.log(`Criando tipo de funcionário no banco: ${employeeType.name}`);
        try {
            const created = await this.prismaService.employeeType.create({
                data: {
                    name: employeeType.name,
                },
            });
            this.logger.log(`Tipo de funcionário criado com sucesso: ${JSON.stringify(created)}`);
            return new employee_type_1.EmployeeType({
                id: created.id,
                name: created.name,
            });
        }
        catch (error) {
            this.logger.error(`Erro ao criar tipo de funcionário no banco: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findAll() {
        this.logger.log('Buscando todos os tipos de funcionário no banco');
        try {
            const employeeTypes = await this.prismaService.employeeType.findMany();
            this.logger.log(`Encontrados ${employeeTypes.length} tipos de funcionário no banco`);
            const mapped = employeeTypes.map((employeeType) => {
                const result = new employee_type_1.EmployeeType({
                    id: employeeType.id,
                    name: employeeType.name,
                });
                return result;
            });
            this.logger.debug(`Dados mapeados: ${JSON.stringify(mapped)}`);
            return mapped;
        }
        catch (error) {
            this.logger.error(`Erro ao buscar tipos de funcionário no banco: ${error.message}`, error.stack);
            return [];
        }
    }
    async findById(id) {
        this.logger.log(`Buscando tipo de funcionário por ID: ${id}`);
        try {
            const employeeType = await this.prismaService.employeeType.findUnique({
                where: { id },
            });
            if (!employeeType) {
                this.logger.log(`Nenhum tipo de funcionário encontrado com o ID: ${id}`);
                return null;
            }
            return new employee_type_1.EmployeeType({
                id: employeeType.id,
                name: employeeType.name,
            });
        }
        catch (error) {
            this.logger.error(`Erro ao buscar tipo de funcionário por ID: ${error.message}`, error.stack);
            return null;
        }
    }
    async findByName(name) {
        this.logger.log(`Buscando tipo de funcionário por nome: ${name}`);
        try {
            const employeeType = await this.prismaService.employeeType.findFirst({
                where: { name },
            });
            if (!employeeType) {
                this.logger.log(`Nenhum tipo de funcionário encontrado com o nome: ${name}`);
                return null;
            }
            return new employee_type_1.EmployeeType({
                id: employeeType.id,
                name: employeeType.name,
            });
        }
        catch (error) {
            this.logger.error(`Erro ao buscar tipo de funcionário por nome: ${error.message}`, error.stack);
            return null;
        }
    }
};
exports.PrismaEmployeeTypeRepository = PrismaEmployeeTypeRepository;
exports.PrismaEmployeeTypeRepository = PrismaEmployeeTypeRepository = PrismaEmployeeTypeRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaEmployeeTypeRepository);
//# sourceMappingURL=prisma-employee-type.repository.js.map