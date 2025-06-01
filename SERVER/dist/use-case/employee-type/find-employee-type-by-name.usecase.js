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
exports.FindEmployeeTypeByNameUseCase = void 0;
const common_1 = require("@nestjs/common");
const employee_type_repository_1 = require("../../domain/repositories/employee-type.repository");
let FindEmployeeTypeByNameUseCase = class FindEmployeeTypeByNameUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(name) {
        const type = await this.repo.findByName(name);
        if (!type)
            throw new common_1.NotFoundException('Tipo de funcionário não encontrado');
        return type;
    }
};
exports.FindEmployeeTypeByNameUseCase = FindEmployeeTypeByNameUseCase;
exports.FindEmployeeTypeByNameUseCase = FindEmployeeTypeByNameUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_type_repository_1.EmployeeTypeRepository])
], FindEmployeeTypeByNameUseCase);
//# sourceMappingURL=find-employee-type-by-name.usecase.js.map