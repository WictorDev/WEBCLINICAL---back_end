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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_employee_usecase_1 = require("../../use-case/employee/create-employee.usecase");
const update_employee_usecase_1 = require("../../use-case/employee/update-employee.usecase");
const prisma_employee_repository_1 = require("../db/repositories/prisma-employee.repository");
const type_repository_1 = require("../../domain/repositories/type.repository");
const employee_type_repository_1 = require("../../domain/repositories/employee-type.repository");
let EmployeeController = class EmployeeController {
    createUseCase;
    updateUseCase;
    repo;
    typeRepository;
    employeeTypeRepository;
    constructor(createUseCase, updateUseCase, repo, typeRepository, employeeTypeRepository) {
        this.createUseCase = createUseCase;
        this.updateUseCase = updateUseCase;
        this.repo = repo;
        this.typeRepository = typeRepository;
        this.employeeTypeRepository = employeeTypeRepository;
    }
    async create(body) {
        try {
            const type = await this.typeRepository.findByName(body.type);
            if (!type) {
                throw new common_1.BadRequestException('Tipo não encontrado.');
            }
            const employeeType = await this.employeeTypeRepository.findByName(body.employeeType);
            if (!employeeType) {
                throw new common_1.BadRequestException('Tipo de funcionário não encontrado.');
            }
            return await this.createUseCase.execute({
                cpf: body.cpf,
                name: body.name,
                advice: body.advice,
                typeId: type.id,
                employeeTypeId: employeeType.id
            });
        }
        catch (error) {
            if (error.message && error.message.includes('CPF')) {
                throw new common_1.BadRequestException(error.message);
            }
            throw error;
        }
    }
    async findAll() {
        return this.repo.findAll();
    }
    async update(cpf, body) {
        try {
            const updatedData = {
                name: body.name,
                advice: body.advice
            };
            if (body.type) {
                const type = await this.typeRepository.findByName(body.type);
                if (!type) {
                    throw new common_1.BadRequestException('Tipo não encontrado.');
                }
                updatedData.typeId = type.id;
            }
            if (body.employeeType) {
                const employeeType = await this.employeeTypeRepository.findByName(body.employeeType);
                if (!employeeType) {
                    throw new common_1.BadRequestException('Tipo de funcionário não encontrado.');
                }
                updatedData.employeeTypeId = employeeType.id;
            }
            return this.updateUseCase.execute(cpf, updatedData);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "update", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, swagger_1.ApiTags)('employees'),
    (0, common_1.Controller)('/api/employees'),
    __metadata("design:paramtypes", [create_employee_usecase_1.CreateEmployeeUseCase,
        update_employee_usecase_1.UpdateEmployeeUseCase,
        prisma_employee_repository_1.PrismaEmployeeRepository,
        type_repository_1.TypeRepository,
        employee_type_repository_1.EmployeeTypeRepository])
], EmployeeController);
//# sourceMappingURL=employee.controller.js.map