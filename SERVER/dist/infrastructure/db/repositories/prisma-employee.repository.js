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
exports.PrismaEmployeeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/services/prisma.service");
const employee_1 = require("../../../domain/entities/employee");
const library_1 = require("@prisma/client/runtime/library");
let PrismaEmployeeRepository = class PrismaEmployeeRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(employee) {
        console.log('PrismaEmployeeRepository - Criando employee:', employee);
        try {
            const created = await this.prismaService.employee.create({
                data: {
                    cpf: employee.cpf,
                    name: employee.name,
                    advice: employee.advice === '' ? null : employee.advice,
                    typeId: employee.typeId,
                    employeeTypeId: employee.employeeTypeId || undefined,
                },
                include: {
                    employeeType: true,
                    type: true
                }
            });
            console.log('PrismaEmployeeRepository - Employee criado:', created);
            return new employee_1.Employee({
                cpf: created.cpf,
                name: created.name,
                advice: created.advice ?? undefined,
                typeId: created.typeId,
                employeeTypeId: created.employeeTypeId || undefined,
            });
        }
        catch (error) {
            console.error('PrismaEmployeeRepository - Erro ao criar employee:', error);
            if (error instanceof library_1.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                const target = error.meta?.target;
                if (Array.isArray(target)) {
                    if (target.includes('cpf')) {
                        throw new common_1.ConflictException('CPF já cadastrado.');
                    }
                }
                else if (typeof target === 'string') {
                    if (target.includes('cpf')) {
                        throw new common_1.ConflictException('CPF já cadastrado.');
                    }
                }
                throw new common_1.ConflictException('CPF já cadastrado.');
            }
            throw error;
        }
    }
    async findAll() {
        console.log('PrismaEmployeeRepository - Buscando todos os employees');
        const employees = await this.prismaService.employee.findMany({
            include: {
                employeeType: true,
                type: true
            }
        });
        console.log('PrismaEmployeeRepository - Employees encontrados:', employees);
        return employees.map((employee) => ({
            cpf: employee.cpf,
            name: employee.name,
            advice: employee.advice ?? undefined,
            typeId: employee.typeId,
            employeeTypeId: employee.employeeTypeId || undefined,
            employeeType: employee.employeeType
                ? { id: employee.employeeType.id, name: employee.employeeType.name }
                : undefined,
        }));
    }
    async findByCpf(cpf) {
        console.log('PrismaEmployeeRepository - Buscando employee por CPF:', cpf);
        const employee = await this.prismaService.employee.findUnique({
            where: { cpf },
            include: {
                employeeType: true,
                type: true
            }
        });
        console.log('PrismaEmployeeRepository - Employee encontrado:', employee);
        if (!employee)
            return null;
        return new employee_1.Employee({
            cpf: employee.cpf,
            name: employee.name,
            advice: employee.advice ?? undefined,
            typeId: employee.typeId,
            employeeTypeId: employee.employeeTypeId || undefined,
        });
    }
    async update(cpf, data) {
        console.log('PrismaEmployeeRepository - Atualizando employee:', { cpf, data });
        try {
            const updated = await this.prismaService.employee.update({
                where: { cpf },
                data: {
                    name: data.name,
                    advice: data.advice === '' ? null : data.advice,
                    typeId: data.typeId,
                    employeeTypeId: data.employeeTypeId,
                },
                include: {
                    employeeType: true,
                    type: true
                }
            });
            console.log('PrismaEmployeeRepository - Employee atualizado:', updated);
            return new employee_1.Employee({
                cpf: updated.cpf,
                name: updated.name,
                advice: updated.advice ?? undefined,
                typeId: updated.typeId,
                employeeTypeId: updated.employeeTypeId || undefined,
            });
        }
        catch (error) {
            console.error('PrismaEmployeeRepository - Erro ao atualizar employee:', error);
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new common_1.ConflictException('Funcionário não encontrado.');
            }
            throw error;
        }
    }
    async delete(cpf) {
        console.log('PrismaEmployeeRepository - Deletando employee:', cpf);
        await this.prismaService.employee.delete({
            where: { cpf }
        });
        console.log('PrismaEmployeeRepository - Employee deletado com sucesso');
    }
};
exports.PrismaEmployeeRepository = PrismaEmployeeRepository;
exports.PrismaEmployeeRepository = PrismaEmployeeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaEmployeeRepository);
//# sourceMappingURL=prisma-employee.repository.js.map