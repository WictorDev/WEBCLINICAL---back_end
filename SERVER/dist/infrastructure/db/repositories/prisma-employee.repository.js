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
        try {
            const created = await this.prismaService.employee.create({
                data: {
                    cpf: employee.cpf,
                    name: employee.name,
                    advice: employee.advice,
                    typeId: employee.typeId,
                    employeeTypeId: employee.employeeTypeId,
                },
            });
            return new employee_1.Employee({
                cpf: created.cpf,
                name: created.name,
                advice: created.advice ?? undefined,
                typeId: created.typeId,
                employeeTypeId: created.employeeTypeId,
            });
        }
        catch (error) {
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
        const employees = await this.prismaService.employee.findMany();
        return employees.map((employee) => new employee_1.Employee({
            cpf: employee.cpf,
            name: employee.name,
            advice: employee.advice ?? undefined,
            typeId: employee.typeId,
            employeeTypeId: employee.employeeTypeId,
        }));
    }
    async findByCpf(cpf) {
        const employee = await this.prismaService.employee.findUnique({ where: { cpf } });
        if (!employee)
            return null;
        return new employee_1.Employee({
            cpf: employee.cpf,
            name: employee.name,
            advice: employee.advice ?? undefined,
            typeId: employee.typeId,
            employeeTypeId: employee.employeeTypeId,
        });
    }
    async update(cpf, data) {
        const updated = await this.prismaService.employee.update({
            where: { cpf },
            data: {
                name: data.name,
                advice: data.advice,
                typeId: data.typeId,
                employeeTypeId: data.employeeTypeId,
            },
        });
        return new employee_1.Employee({
            cpf: updated.cpf,
            name: updated.name,
            advice: updated.advice ?? undefined,
            typeId: updated.typeId,
            employeeTypeId: updated.employeeTypeId,
        });
    }
};
exports.PrismaEmployeeRepository = PrismaEmployeeRepository;
exports.PrismaEmployeeRepository = PrismaEmployeeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaEmployeeRepository);
//# sourceMappingURL=prisma-employee.repository.js.map