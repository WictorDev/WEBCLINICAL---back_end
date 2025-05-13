"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecordModule = void 0;
const common_1 = require("@nestjs/common");
const medical_record_controller_1 = require("../controllers/medical-record.controller");
const prisma_medical_record_repository_1 = require("../db/repositories/prisma-medical-record.repository");
const finalize_appointment_usecase_1 = require("../../use-case/appointment/finalize-appointment.usecase");
const prisma_appointment_repository_1 = require("../db/repositories/prisma-appointment.repository");
const prisma_module_1 = require("./prisma.module");
const tokens_constants_1 = require("../constants/tokens.constants");
let MedicalRecordModule = class MedicalRecordModule {
};
exports.MedicalRecordModule = MedicalRecordModule;
exports.MedicalRecordModule = MedicalRecordModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [medical_record_controller_1.MedicalRecordController],
        providers: [
            prisma_medical_record_repository_1.PrismaMedicalRecordRepository,
            {
                provide: tokens_constants_1.MEDICAL_RECORD_REPOSITORY_TOKEN,
                useClass: prisma_medical_record_repository_1.PrismaMedicalRecordRepository,
            },
            finalize_appointment_usecase_1.FinalizeAppointmentUseCase,
            prisma_appointment_repository_1.PrismaAppointmentRepository,
            {
                provide: tokens_constants_1.APPOINTMENT_REPOSITORY_TOKEN,
                useClass: prisma_appointment_repository_1.PrismaAppointmentRepository,
            },
        ],
        exports: [
            tokens_constants_1.MEDICAL_RECORD_REPOSITORY_TOKEN,
            tokens_constants_1.APPOINTMENT_REPOSITORY_TOKEN,
            finalize_appointment_usecase_1.FinalizeAppointmentUseCase,
        ],
    })
], MedicalRecordModule);
//# sourceMappingURL=medical-record.module.js.map