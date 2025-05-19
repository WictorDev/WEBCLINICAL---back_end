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
exports.CreateEmployeeTypeUseCase = void 0;
const common_1 = require("@nestjs/common");
const prisma_employee_type_repository_1 = require("../../infrastructure/db/repositories/prisma-employee-type.repository");
const employee_type_1 = require("../../domain/entities/employee-type");
let CreateEmployeeTypeUseCase = class CreateEmployeeTypeUseCase {
    employeeTypeRepo;
    constructor(employeeTypeRepo) {
        this.employeeTypeRepo = employeeTypeRepo;
    }
    async execute(data) {
        const employeeType = new employee_type_1.EmployeeType({ id: '', name: data.name });
        return this.employeeTypeRepo.create(employeeType);
    }
};
exports.CreateEmployeeTypeUseCase = CreateEmployeeTypeUseCase;
exports.CreateEmployeeTypeUseCase = CreateEmployeeTypeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_employee_type_repository_1.PrismaEmployeeTypeRepository])
], CreateEmployeeTypeUseCase);
//# sourceMappingURL=create-employee-type.usecase.js.map