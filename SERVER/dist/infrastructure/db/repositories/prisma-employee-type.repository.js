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
exports.PrismaEmployeeTypeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/services/prisma.service");
const employee_type_1 = require("../../../domain/entities/employee-type");
let PrismaEmployeeTypeRepository = class PrismaEmployeeTypeRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(employeeType) {
        const created = await this.prismaService.employeeType.create({
            data: {
                name: employeeType.name,
            },
        });
        return new employee_type_1.EmployeeType({
            id: created.id,
            name: created.name,
        });
    }
    async findAll() {
        const employeeTypes = await this.prismaService.employeeType.findMany();
        return employeeTypes.map((employeeType) => new employee_type_1.EmployeeType({
            id: employeeType.id,
            name: employeeType.name,
        }));
    }
    async findById(id) {
        const employeeType = await this.prismaService.employeeType.findUnique({
            where: { id },
        });
        if (!employeeType)
            return null;
        return new employee_type_1.EmployeeType({
            id: employeeType.id,
            name: employeeType.name,
        });
    }
    async findByName(name) {
        const employeeType = await this.prismaService.employeeType.findFirst({
            where: { name },
        });
        if (!employeeType)
            return null;
        return new employee_type_1.EmployeeType({
            id: employeeType.id,
            name: employeeType.name,
        });
    }
};
exports.PrismaEmployeeTypeRepository = PrismaEmployeeTypeRepository;
exports.PrismaEmployeeTypeRepository = PrismaEmployeeTypeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaEmployeeTypeRepository);
//# sourceMappingURL=prisma-employee-type.repository.js.map