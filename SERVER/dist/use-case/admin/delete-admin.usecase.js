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
exports.DeleteAdminUseCase = void 0;
const common_1 = require("@nestjs/common");
const admin_repository_1 = require("../../domain/repositories/admin.repository");
let DeleteAdminUseCase = class DeleteAdminUseCase {
    adminRepository;
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async execute(cpf) {
        const admin = await this.adminRepository.findByCpf(cpf);
        if (!admin) {
            throw new common_1.BadRequestException('Admin não encontrado.');
        }
        await this.adminRepository.delete(cpf);
    }
};
exports.DeleteAdminUseCase = DeleteAdminUseCase;
exports.DeleteAdminUseCase = DeleteAdminUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository])
], DeleteAdminUseCase);
//# sourceMappingURL=delete-admin.usecase.js.map