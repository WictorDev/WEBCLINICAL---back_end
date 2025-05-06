"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma.module");
const type_controller_1 = require("../controllers/type.controller");
const prisma_type_repository_1 = require("../db/repositories/prisma-type.repository");
const create_type_usecase_1 = require("../../use-case/type/create-type.usecase");
const type_repository_1 = require("../../domain/repositories/type.repository");
let TypeModule = class TypeModule {
};
exports.TypeModule = TypeModule;
exports.TypeModule = TypeModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [type_controller_1.TypeController],
        providers: [
            {
                provide: type_repository_1.TypeRepository,
                useClass: prisma_type_repository_1.PrismaTypeRepository,
            },
            prisma_type_repository_1.PrismaTypeRepository,
            create_type_usecase_1.CreateTypeUseCase
        ],
        exports: [
            type_repository_1.TypeRepository,
            prisma_type_repository_1.PrismaTypeRepository,
            create_type_usecase_1.CreateTypeUseCase
        ],
    })
], TypeModule);
//# sourceMappingURL=type.module.js.map