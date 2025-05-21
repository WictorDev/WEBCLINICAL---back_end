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
exports.CreateEmployeeUseCase = void 0;
const common_1 = require("@nestjs/common");
const employee_repository_1 = require("../../domain/repositories/employee.repository");
const employee_1 = require("../../domain/entities/employee");
let CreateEmployeeUseCase = class CreateEmployeeUseCase {
    employeeRepository;
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    async execute(data) {
        const employee = new employee_1.Employee(data);
        return await this.employeeRepository.create(employee);
    }
};
exports.CreateEmployeeUseCase = CreateEmployeeUseCase;
exports.CreateEmployeeUseCase = CreateEmployeeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_repository_1.EmployeeRepository])
], CreateEmployeeUseCase);
//# sourceMappingURL=create-employee.usecase.js.map