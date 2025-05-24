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
exports.EmployeeTypeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_employee_type_usecase_1 = require("../../use-case/employee-type/create-employee-type.usecase");
const find_all_employee_types_usecase_1 = require("../../use-case/employee-type/find-all-employee-types.usecase");
const find_employee_type_by_id_usecase_1 = require("../../use-case/employee-type/find-employee-type-by-id.usecase");
const find_employee_type_by_name_usecase_1 = require("../../use-case/employee-type/find-employee-type-by-name.usecase");
let EmployeeTypeController = class EmployeeTypeController {
    createUseCase;
    findAllUseCase;
    findByIdUseCase;
    findByNameUseCase;
    constructor(createUseCase, findAllUseCase, findByIdUseCase, findByNameUseCase) {
        this.createUseCase = createUseCase;
        this.findAllUseCase = findAllUseCase;
        this.findByIdUseCase = findByIdUseCase;
        this.findByNameUseCase = findByNameUseCase;
    }
    async create(body) {
        return this.createUseCase.execute(body);
    }
    async findAll() {
        return this.findAllUseCase.execute();
    }
    async findById(id) {
        return this.findByIdUseCase.execute(id);
    }
    async findByName(name) {
        return this.findByNameUseCase.execute(name);
    }
};
exports.EmployeeTypeController = EmployeeTypeController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar um novo tipo de funcionário' }),
    (0, swagger_1.ApiBody)({
        schema: {
            example: {
                name: 'PSICÓLOGO'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tipo criado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os tipos de funcionário' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de tipos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar tipo de funcionário por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do tipo de funcionário' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tipo encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tipo não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeTypeController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('name/:name'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar tipo de funcionário por nome' }),
    (0, swagger_1.ApiParam)({ name: 'name', description: 'Nome do tipo de funcionário' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tipo encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tipo não encontrado' }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeTypeController.prototype, "findByName", null);
exports.EmployeeTypeController = EmployeeTypeController = __decorate([
    (0, swagger_1.ApiTags)('employee-types'),
    (0, common_1.Controller)('api/employee-types'),
    __metadata("design:paramtypes", [create_employee_type_usecase_1.CreateEmployeeTypeUseCase,
        find_all_employee_types_usecase_1.FindAllEmployeeTypesUseCase,
        find_employee_type_by_id_usecase_1.FindEmployeeTypeByIdUseCase,
        find_employee_type_by_name_usecase_1.FindEmployeeTypeByNameUseCase])
], EmployeeTypeController);
//# sourceMappingURL=employee-type.controller.js.map