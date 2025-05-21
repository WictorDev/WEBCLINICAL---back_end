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
const type_repository_1 = require("../../domain/repositories/type.repository");
let CreateEmployeeUseCase = class CreateEmployeeUseCase {
    employeeRepository;
    typeRepository;
    constructor(employeeRepository, typeRepository) {
        this.employeeRepository = employeeRepository;
        this.typeRepository = typeRepository;
    }
    async execute(data) {
        const type = await this.typeRepository.findByName(data.type);
        if (!type) {
            throw new common_1.BadRequestException(`Tipo ${data.type} não encontrado.`);
        }
        const employee = new employee_1.Employee({
            cpf: data.cpf,
            name: data.name,
            typeId: type.id,
            employeeTypeId: data.employeeTypeId,
            advice: data.advice
        });
        return await this.employeeRepository.create(employee);
    }
};
exports.CreateEmployeeUseCase = CreateEmployeeUseCase;
exports.CreateEmployeeUseCase = CreateEmployeeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_repository_1.EmployeeRepository,
        type_repository_1.TypeRepository])
], CreateEmployeeUseCase);
//# sourceMappingURL=create-employee.usecase.js.map