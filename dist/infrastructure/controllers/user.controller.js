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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_usecase_1 = require("../../use-case/user/create-user.usecase");
const update_user_usecase_1 = require("../../use-case/user/update-user.usecase");
const findByCpf_user_usecase_1 = require("../../use-case/user/findByCpf-user.usecase");
const findByEmail_user_usecase_1 = require("../../use-case/user/findByEmail-user.usecase");
const find_user_usecase_1 = require("../../use-case/user/find-user.usecase");
const jwt_guard_1 = require("../auth/jwt.guard");
const unique_entity_cpf_1 = require("../../core/entities/unique-entity-cpf");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../auth/public.decorator");
const type_repository_1 = require("../../domain/repositories/type.repository");
let UserController = class UserController {
    createUserUseCase;
    updateUserUseCase;
    findUserByCpfUseCase;
    findUserByEmailUseCase;
    findUserUseCase;
    typeRepository;
    constructor(createUserUseCase, updateUserUseCase, findUserByCpfUseCase, findUserByEmailUseCase, findUserUseCase, typeRepository) {
        this.createUserUseCase = createUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.findUserByCpfUseCase = findUserByCpfUseCase;
        this.findUserByEmailUseCase = findUserByEmailUseCase;
        this.findUserUseCase = findUserUseCase;
        this.typeRepository = typeRepository;
    }
    async findAll() {
        return this.findUserUseCase.execute();
    }
    async findByEmail(email) {
        return this.findUserByEmailUseCase.execute(email);
    }
    async findByCpf(cpf) {
        return this.findUserByCpfUseCase.execute(new unique_entity_cpf_1.UniqueEntityCpf(cpf));
    }
    async create(body) {
        try {
            const type = await this.typeRepository.findByName(body.type);
            if (!type) {
                throw new common_1.BadRequestException('Tipo de usuário não encontrado.');
            }
            return this.createUserUseCase.execute({
                ...body,
                cpf: new unique_entity_cpf_1.UniqueEntityCpf(body.cpf),
                type: type.id
            });
        }
        catch (error) {
            if (error.message && error.message.includes('CPF')) {
                throw new common_1.BadRequestException(error.message);
            }
            throw error;
        }
    }
    async createFirstUser(body) {
        const users = await this.findUserUseCase.execute();
        if (users && users.length > 0) {
            throw new common_1.BadRequestException('Já existe um usuário cadastrado.');
        }
        try {
            const type = await this.typeRepository.findByName('ADMIN');
            if (!type) {
                throw new common_1.BadRequestException('Tipo de usuário não encontrado.');
            }
            return this.createUserUseCase.execute({
                ...body,
                cpf: new unique_entity_cpf_1.UniqueEntityCpf(body.cpf),
                type: type.id
            });
        }
        catch (error) {
            if (error.message && error.message.includes('CPF')) {
                throw new common_1.BadRequestException(error.message);
            }
            throw error;
        }
    }
    async update(cpf, body) {
        return this.updateUserUseCase.execute(new unique_entity_cpf_1.UniqueEntityCpf(cpf), body);
    }
    async delete(cpf) {
        return this.updateUserUseCase.execute(new unique_entity_cpf_1.UniqueEntityCpf(cpf), { active: false });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Get)('cpf/:cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByCpf", null);
__decorate([
    (0, common_1.Post)('/create_user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/create_first_admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createFirstUser", null);
__decorate([
    (0, common_1.Put)(':cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('/api/users'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [create_user_usecase_1.CreateUserUseCase,
        update_user_usecase_1.UpdateUserUseCase,
        findByCpf_user_usecase_1.FindUserByCpfUseCase,
        findByEmail_user_usecase_1.FindUserByEmailUseCase,
        find_user_usecase_1.FindUserUseCase,
        type_repository_1.TypeRepository])
], UserController);
//# sourceMappingURL=user.controller.js.map