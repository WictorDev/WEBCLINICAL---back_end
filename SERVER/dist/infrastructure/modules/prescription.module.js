"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionModule = void 0;
const common_1 = require("@nestjs/common");
const prescription_controller_1 = require("../controllers/prescription.controller");
const prisma_prescription_repository_1 = require("../db/repositories/prisma-prescription.repository");
const prescription_repository_1 = require("../../domain/repositories/prescription.repository");
const add_prescription_usecase_1 = require("../../use-case/medical-record/add-prescription.usecase");
const prisma_module_1 = require("./prisma.module");
let PrescriptionModule = class PrescriptionModule {
};
exports.PrescriptionModule = PrescriptionModule;
exports.PrescriptionModule = PrescriptionModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [prescription_controller_1.PrescriptionController],
        providers: [
            {
                provide: prescription_repository_1.PrescriptionRepository,
                useClass: prisma_prescription_repository_1.PrismaPrescriptionRepository,
            },
            prisma_prescription_repository_1.PrismaPrescriptionRepository,
            add_prescription_usecase_1.AddPrescriptionUseCase,
        ],
        exports: [
            prescription_repository_1.PrescriptionRepository,
            prisma_prescription_repository_1.PrismaPrescriptionRepository,
            add_prescription_usecase_1.AddPrescriptionUseCase,
        ],
    })
], PrescriptionModule);
//# sourceMappingURL=prescription.module.js.map