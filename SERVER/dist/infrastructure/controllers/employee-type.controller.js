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
var EmployeeTypeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeTypeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_employee_type_usecase_1 = require("../../use-case/employee/create-employee-type.usecase");
const find_all_employee_type_usecase_1 = require("../../use-case/employee/find-all-employee-type.usecase");
const jwt_guard_1 = require("../auth/jwt.guard");
const public_decorator_1 = require("../auth/public.decorator");
let EmployeeTypeController = EmployeeTypeController_1 = class EmployeeTypeController {
    createEmployeeTypeUseCase;
    findAllEmployeeTypeUseCase;
    logger = new common_1.Logger(EmployeeTypeController_1.name);
    constructor(createEmployeeTypeUseCase, findAllEmployeeTypeUseCase) {
        this.createEmployeeTypeUseCase = createEmployeeTypeUseCase;
        this.findAllEmployeeTypeUseCase = findAllEmployeeTypeUseCase;
    }
    async create(body) {
        try {
            const result = await this.createEmployeeTypeUseCase.execute(body);
            return result;
        }
        catch (error) {
            this.logger.error(`Erro ao criar tipo de funcionário: ${error.message}`);
            if (error.message && error.message.includes('Tipo')) {
                throw new common_1.BadRequestException(error.message);
            }
            throw error;
        }
    }
    async findAll() {
        try {
            const result = await this.findAllEmployeeTypeUseCase.execute();
            if (!result) {
                return [];
            }
            const serializedResult = Array.isArray(result)
                ? result.map(item => ({
                    id: item.id,
                    name: item.name
                }))
                : [];
            return serializedResult;
        }
        catch (error) {
            this.logger.error(`Erro ao buscar tipos de funcionário: ${error.message}`);
            throw new common_1.InternalServerErrorException('Erro ao buscar tipos de funcionário');
        }
    }
};
exports.EmployeeTypeController = EmployeeTypeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeTypeController.prototype, "findAll", null);
exports.EmployeeTypeController = EmployeeTypeController = EmployeeTypeController_1 = __decorate([
    (0, swagger_1.ApiTags)('employee-types'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('/api/employee-types'),
    __metadata("design:paramtypes", [create_employee_type_usecase_1.CreateEmployeeTypeUseCase,
        find_all_employee_type_usecase_1.FindAllEmployeeTypeUseCase])
], EmployeeTypeController);
//# sourceMappingURL=employee-type.controller.js.map