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
exports.DeleteUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../domain/repositories/user.repository");
const type_repository_1 = require("../../domain/repositories/type.repository");
const delete_admin_usecase_1 = require("../admin/delete-admin.usecase");
const delete_employee_usecase_1 = require("../employee/delete-employee.usecase");
let DeleteUserUseCase = class DeleteUserUseCase {
    userRepository;
    typeRepository;
    deleteAdminUseCase;
    deleteEmployeeUseCase;
    constructor(userRepository, typeRepository, deleteAdminUseCase, deleteEmployeeUseCase) {
        this.userRepository = userRepository;
        this.typeRepository = typeRepository;
        this.deleteAdminUseCase = deleteAdminUseCase;
        this.deleteEmployeeUseCase = deleteEmployeeUseCase;
    }
    async execute(cpf) {
        const existingUser = await this.userRepository.findByCpf(cpf.toString());
        if (!existingUser) {
            throw new common_1.BadRequestException("Usuário não encontrado.");
        }
        for (const typeId of existingUser.types) {
            const type = await this.typeRepository.findById(typeId);
            if (type) {
                await this.removeFromSpecificTable(type.name, cpf.toString());
            }
        }
        await this.userRepository.delete(cpf.toString());
    }
    async removeFromSpecificTable(typeName, cpf) {
        switch (typeName.toUpperCase()) {
            case 'ADMIN':
                await this.deleteAdminUseCase.execute(cpf);
                break;
            case 'EMPLOYEE':
                await this.deleteEmployeeUseCase.execute(cpf);
                break;
            default:
                throw new common_1.BadRequestException(`Tipo ${typeName} não suportado`);
        }
    }
};
exports.DeleteUserUseCase = DeleteUserUseCase;
exports.DeleteUserUseCase = DeleteUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        type_repository_1.TypeRepository,
        delete_admin_usecase_1.DeleteAdminUseCase,
        delete_employee_usecase_1.DeleteEmployeeUseCase])
], DeleteUserUseCase);
//# sourceMappingURL=delete-user.usecase.js.map