"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeTypeModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_employee_type_repository_1 = require("../db/repositories/prisma-employee-type.repository");
const employee_type_repository_1 = require("../../domain/repositories/employee-type.repository");
const create_employee_type_usecase_1 = require("../../use-case/employee-type/create-employee-type.usecase");
const find_all_employee_types_usecase_1 = require("../../use-case/employee-type/find-all-employee-types.usecase");
const find_employee_type_by_id_usecase_1 = require("../../use-case/employee-type/find-employee-type-by-id.usecase");
const find_employee_type_by_name_usecase_1 = require("../../use-case/employee-type/find-employee-type-by-name.usecase");
const employee_type_controller_1 = require("../controllers/employee-type.controller");
const prisma_module_1 = require("./prisma.module");
let EmployeeTypeModule = class EmployeeTypeModule {
};
exports.EmployeeTypeModule = EmployeeTypeModule;
exports.EmployeeTypeModule = EmployeeTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [employee_type_controller_1.EmployeeTypeController],
        providers: [
            {
                provide: employee_type_repository_1.EmployeeTypeRepository,
                useClass: prisma_employee_type_repository_1.PrismaEmployeeTypeRepository,
            },
            prisma_employee_type_repository_1.PrismaEmployeeTypeRepository,
            create_employee_type_usecase_1.CreateEmployeeTypeUseCase,
            find_all_employee_types_usecase_1.FindAllEmployeeTypesUseCase,
            find_employee_type_by_id_usecase_1.FindEmployeeTypeByIdUseCase,
            find_employee_type_by_name_usecase_1.FindEmployeeTypeByNameUseCase,
        ],
        exports: [
            employee_type_repository_1.EmployeeTypeRepository,
            prisma_employee_type_repository_1.PrismaEmployeeTypeRepository,
            create_employee_type_usecase_1.CreateEmployeeTypeUseCase,
            find_all_employee_types_usecase_1.FindAllEmployeeTypesUseCase,
            find_employee_type_by_id_usecase_1.FindEmployeeTypeByIdUseCase,
            find_employee_type_by_name_usecase_1.FindEmployeeTypeByNameUseCase,
        ],
    })
], EmployeeTypeModule);
//# sourceMappingURL=employee-type.module.js.map