"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma.module");
const admin_controller_1 = require("../controllers/admin.controller");
const create_admin_usecase_1 = require("../../use-case/admin/create-admin.usecase");
const delete_admin_usecase_1 = require("../../use-case/admin/delete-admin.usecase");
const admin_repository_1 = require("../../domain/repositories/admin.repository");
const type_module_1 = require("./type.module");
const prisma_admin_repository_1 = require("../db/repositories/prisma-admin.repository");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, type_module_1.TypeModule],
        controllers: [admin_controller_1.AdminController],
        providers: [
            {
                provide: admin_repository_1.AdminRepository,
                useClass: prisma_admin_repository_1.PrismaAdminRepository,
            },
            prisma_admin_repository_1.PrismaAdminRepository,
            create_admin_usecase_1.CreateAdminUseCase,
            delete_admin_usecase_1.DeleteAdminUseCase,
        ],
        exports: [
            admin_repository_1.AdminRepository,
            prisma_admin_repository_1.PrismaAdminRepository,
            create_admin_usecase_1.CreateAdminUseCase,
            delete_admin_usecase_1.DeleteAdminUseCase,
        ],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map