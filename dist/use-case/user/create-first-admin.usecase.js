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
exports.CreateFirstAdminUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../domain/repositories/user.repository");
const user_1 = require("../../domain/entities/user");
const create_admin_usecase_1 = require("../admin/create-admin.usecase");
const unique_entity_cpf_1 = require("../../core/entities/unique-entity-cpf");
const type_repository_1 = require("../../domain/repositories/type.repository");
let CreateFirstAdminUseCase = class CreateFirstAdminUseCase {
    userRepository;
    createAdminUseCase;
    typeRepository;
    constructor(userRepository, createAdminUseCase, typeRepository) {
        this.userRepository = userRepository;
        this.createAdminUseCase = createAdminUseCase;
        this.typeRepository = typeRepository;
    }
    async execute(data) {
        try {
            const type = await this.typeRepository.findByName('ADMIN');
            if (!type) {
                throw new common_1.BadRequestException('Tipo ADMIN não encontrado no banco de dados');
            }
            const user = new user_1.User({
                name: data.name,
                cpf: new unique_entity_cpf_1.default(data.cpf),
                email: data.email,
                password: data.password,
                companyId: data.companyId,
                types: [type.name],
                active: data.active
            });
            const createdUser = await this.userRepository.create(user);
            await this.createAdminUseCase.execute({
                cpf: data.cpf,
                name: data.name,
                type: type.name
            });
            return createdUser;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erro ao criar usuário administrador: ${error.message}`);
        }
    }
};
exports.CreateFirstAdminUseCase = CreateFirstAdminUseCase;
exports.CreateFirstAdminUseCase = CreateFirstAdminUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        create_admin_usecase_1.CreateAdminUseCase,
        type_repository_1.TypeRepository])
], CreateFirstAdminUseCase);
//# sourceMappingURL=create-first-admin.usecase.js.map