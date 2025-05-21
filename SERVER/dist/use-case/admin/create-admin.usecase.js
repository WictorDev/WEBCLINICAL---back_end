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
exports.CreateAdminUseCase = void 0;
const common_1 = require("@nestjs/common");
const admin_repository_1 = require("../../domain/repositories/admin.repository");
const admin_1 = require("../../domain/entities/admin");
const unique_entity_cpf_1 = require("../../core/entities/unique-entity-cpf");
let CreateAdminUseCase = class CreateAdminUseCase {
    adminRepository;
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async execute(data) {
        const admin = new admin_1.Admin({
            cpf: new unique_entity_cpf_1.default(data.cpf),
            name: data.name,
            type: data.type
        });
        return await this.adminRepository.create(admin);
    }
};
exports.CreateAdminUseCase = CreateAdminUseCase;
exports.CreateAdminUseCase = CreateAdminUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository])
], CreateAdminUseCase);
//# sourceMappingURL=create-admin.usecase.js.map