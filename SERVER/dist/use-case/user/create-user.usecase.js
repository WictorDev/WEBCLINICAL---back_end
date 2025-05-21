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
exports.CreateUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../domain/repositories/user.repository");
const type_repository_1 = require("../../domain/repositories/type.repository");
const user_1 = require("../../domain/entities/user");
const unique_entity_cpf_1 = require("../../core/entities/unique-entity-cpf");
const bcrypt = require("bcrypt");
let CreateUserUseCase = class CreateUserUseCase {
    userRepository;
    typeRepository;
    constructor(userRepository, typeRepository) {
        this.userRepository = userRepository;
        this.typeRepository = typeRepository;
    }
    async execute(data) {
        const type = await this.typeRepository.findByName(data.type);
        if (!type) {
            throw new common_1.BadRequestException(`Tipo ${data.type} não encontrado.`);
        }
        const existingUserByCpf = await this.userRepository.findByCpf(data.cpf);
        const existingUserByEmail = await this.userRepository.findByEmail(data.email);
        const existingUser = existingUserByCpf || existingUserByEmail;
        if (existingUser) {
            if (!existingUser.types.includes(type.id)) {
                const updatedTypes = [...existingUser.types, type.id];
                const updatedUser = await this.userRepository.update(existingUser.cpf.toString(), { types: updatedTypes });
                return updatedUser;
            }
            return existingUser;
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = new user_1.User({
            name: data.name,
            cpf: new unique_entity_cpf_1.UniqueEntityCpf(data.cpf),
            email: data.email,
            password: hashedPassword,
            companyId: data.companyId,
            types: [type.id],
            active: data.active
        });
        const createdUser = await this.userRepository.create(user);
        return createdUser;
    }
};
exports.CreateUserUseCase = CreateUserUseCase;
exports.CreateUserUseCase = CreateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        type_repository_1.TypeRepository])
], CreateUserUseCase);
//# sourceMappingURL=create-user.usecase.js.map