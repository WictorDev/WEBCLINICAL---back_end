"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_controller_1 = require("../controllers/user.controller");
const prisma_module_1 = require("./prisma.module");
const prisma_user_repository_1 = require("../db/repositories/prisma-user.repository");
const user_repository_1 = require("../../domain/repositories/user.repository");
const create_user_usecase_1 = require("../../use-case/user/create-user.usecase");
const findByCpf_user_usecase_1 = require("../../use-case/user/findByCpf-user.usecase");
const findByEmail_user_usecase_1 = require("../../use-case/user/findByEmail-user.usecase");
const find_user_usecase_1 = require("../../use-case/user/find-user.usecase");
const update_user_usecase_1 = require("../../use-case/user/update-user.usecase");
const type_repository_1 = require("../../domain/repositories/type.repository");
const prisma_type_repository_1 = require("../db/repositories/prisma-type.repository");
const find_all_users_usecase_1 = require("../../use-case/user/find-all-users.usecase");
const create_admin_usecase_1 = require("../../use-case/admin/create-admin.usecase");
const create_employee_usecase_1 = require("../../use-case/employee/create-employee.usecase");
const create_patient_usecase_1 = require("../../use-case/patient/create-patient.usecase");
const employee_module_1 = require("./employee.module");
const patient_module_1 = require("./patient.module");
const admin_module_1 = require("./admin.module");
const create_first_admin_usecase_1 = require("../../use-case/user/create-first-admin.usecase");
const type_module_1 = require("./type.module");
const employee_type_module_1 = require("./employee-type.module");
const prisma_employee_type_repository_1 = require("../db/repositories/prisma-employee-type.repository");
const prisma_employee_repository_1 = require("../db/repositories/prisma-employee.repository");
const delete_user_usecase_1 = require("../../use-case/user/delete-user.usecase");
const email_service_1 = require("../../core/services/email.service");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            config_1.ConfigModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'your-secret-key',
                signOptions: { expiresIn: '24h' },
            }),
            admin_module_1.AdminModule,
            employee_module_1.EmployeeModule,
            (0, common_1.forwardRef)(() => patient_module_1.PatientModule),
            type_module_1.TypeModule,
            employee_type_module_1.EmployeeTypeModule
        ],
        controllers: [user_controller_1.UserController],
        providers: [
            {
                provide: user_repository_1.UserRepository,
                useClass: prisma_user_repository_1.PrismaUserRepository,
            },
            prisma_user_repository_1.PrismaUserRepository,
            {
                provide: type_repository_1.TypeRepository,
                useClass: prisma_type_repository_1.PrismaTypeRepository,
            },
            prisma_type_repository_1.PrismaTypeRepository,
            {
                provide: 'EmployeeTypeRepository',
                useClass: prisma_employee_type_repository_1.PrismaEmployeeTypeRepository,
            },
            {
                provide: 'EmployeeRepository',
                useClass: prisma_employee_repository_1.PrismaEmployeeRepository,
            },
            create_user_usecase_1.CreateUserUseCase,
            find_user_usecase_1.FindUserUseCase,
            findByCpf_user_usecase_1.FindUserByCpfUseCase,
            findByEmail_user_usecase_1.FindUserByEmailUseCase,
            update_user_usecase_1.UpdateUserUseCase,
            find_all_users_usecase_1.FindAllUsersUseCase,
            create_admin_usecase_1.CreateAdminUseCase,
            create_employee_usecase_1.CreateEmployeeUseCase,
            create_patient_usecase_1.CreatePatientUseCase,
            create_first_admin_usecase_1.CreateFirstAdminUseCase,
            delete_user_usecase_1.DeleteUserUseCase,
            email_service_1.EmailService,
        ],
        exports: [
            user_repository_1.UserRepository,
            prisma_user_repository_1.PrismaUserRepository,
            type_repository_1.TypeRepository,
            prisma_type_repository_1.PrismaTypeRepository,
            create_user_usecase_1.CreateUserUseCase,
            find_user_usecase_1.FindUserUseCase,
            findByCpf_user_usecase_1.FindUserByCpfUseCase,
            findByEmail_user_usecase_1.FindUserByEmailUseCase,
            update_user_usecase_1.UpdateUserUseCase,
            find_all_users_usecase_1.FindAllUsersUseCase,
            create_admin_usecase_1.CreateAdminUseCase,
            create_employee_usecase_1.CreateEmployeeUseCase,
            create_patient_usecase_1.CreatePatientUseCase,
            create_first_admin_usecase_1.CreateFirstAdminUseCase,
            delete_user_usecase_1.DeleteUserUseCase,
            email_service_1.EmailService,
        ],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map