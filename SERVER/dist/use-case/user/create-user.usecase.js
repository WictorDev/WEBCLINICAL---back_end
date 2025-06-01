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
const create_admin_usecase_1 = require("../admin/create-admin.usecase");
const create_employee_usecase_1 = require("../employee/create-employee.usecase");
let CreateUserUseCase = class CreateUserUseCase {
    userRepository;
    typeRepository;
    createAdminUseCase;
    createEmployeeUseCase;
    constructor(userRepository, typeRepository, createAdminUseCase, createEmployeeUseCase) {
        this.userRepository = userRepository;
        this.typeRepository = typeRepository;
        this.createAdminUseCase = createAdminUseCase;
        this.createEmployeeUseCase = createEmployeeUseCase;
    }
    async execute(data) {
        const existingUser = await this.userRepository.findByCpf(data.cpf);
        if (existingUser) {
            throw new common_1.ConflictException('CPF já cadastrado.');
        }
        const existingEmail = await this.userRepository.findByEmail(data.email);
        if (existingEmail) {
            throw new common_1.ConflictException('E-mail já cadastrado.');
        }
        const types = await Promise.all(data.types.map(async (typeName) => {
            const type = await this.typeRepository.findByName(typeName);
            if (!type) {
                throw new common_1.BadRequestException(`Tipo ${typeName} não encontrado.`);
            }
            return type;
        }));
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = new user_1.User({
            cpf: new unique_entity_cpf_1.UniqueEntityCpf(data.cpf),
            name: data.name,
            email: data.email,
            password: hashedPassword,
            companyId: data.companyId,
            types: data.types,
            active: data.active ?? true,
        });
        const createdUser = await this.userRepository.create(user);
        for (const type of types) {
            await this.createInSpecificTable(type.name, {
                cpf: data.cpf,
                name: data.name,
                email: data.email,
                password: hashedPassword,
                type: type.name,
                employeeTypeId: data.employeeTypeId,
                advice: data.advice
            });
        }
        return createdUser;
    }
    async createInSpecificTable(typeName, data) {
        if (!typeName)
            return;
        switch (typeName.toUpperCase()) {
            case 'ADMIN':
                await this.createAdminUseCase.execute({
                    cpf: data.cpf,
                    name: data.name,
                    type: typeName
                });
                break;
            case 'EMPLOYEE':
                await this.createEmployeeUseCase.execute({
                    cpf: data.cpf,
                    name: data.name,
                    type: typeName,
                    employeeTypeId: data.employeeTypeId,
                    advice: data.advice
                });
                break;
            default:
                throw new common_1.BadRequestException(`Tipo ${typeName} não suportado`);
        }
    }
};
exports.CreateUserUseCase = CreateUserUseCase;
exports.CreateUserUseCase = CreateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        type_repository_1.TypeRepository,
        create_admin_usecase_1.CreateAdminUseCase,
        create_employee_usecase_1.CreateEmployeeUseCase])
], CreateUserUseCase);
//# sourceMappingURL=create-user.usecase.js.map