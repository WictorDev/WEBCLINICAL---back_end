"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma.module");
const employee_controller_1 = require("../controllers/employee.controller");
const prisma_employee_repository_1 = require("../db/repositories/prisma-employee.repository");
const create_employee_usecase_1 = require("../../use-case/employee/create-employee.usecase");
const update_employee_usecase_1 = require("../../use-case/employee/update-employee.usecase");
const delete_employee_usecase_1 = require("../../use-case/employee/delete-employee.usecase");
const employee_repository_1 = require("../../domain/repositories/employee.repository");
const type_module_1 = require("./type.module");
const employee_type_module_1 = require("./employee-type.module");
let EmployeeModule = class EmployeeModule {
};
exports.EmployeeModule = EmployeeModule;
exports.EmployeeModule = EmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, type_module_1.TypeModule, employee_type_module_1.EmployeeTypeModule],
        controllers: [employee_controller_1.EmployeeController],
        providers: [
            {
                provide: employee_repository_1.EmployeeRepository,
                useClass: prisma_employee_repository_1.PrismaEmployeeRepository,
            },
            prisma_employee_repository_1.PrismaEmployeeRepository,
            create_employee_usecase_1.CreateEmployeeUseCase,
            update_employee_usecase_1.UpdateEmployeeUseCase,
            delete_employee_usecase_1.DeleteEmployeeUseCase,
        ],
        exports: [
            employee_repository_1.EmployeeRepository,
            prisma_employee_repository_1.PrismaEmployeeRepository,
            create_employee_usecase_1.CreateEmployeeUseCase,
            update_employee_usecase_1.UpdateEmployeeUseCase,
            delete_employee_usecase_1.DeleteEmployeeUseCase,
        ],
    })
], EmployeeModule);
//# sourceMappingURL=employee.module.js.map