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
const medical_record_repository_1 = require("../../domain/repositories/medical-record.repository");
const finalize_appointment_usecase_1 = require("../../use-case/appointment/finalize-appointment.usecase");
const prisma_appointment_repository_1 = require("../db/repositories/prisma-appointment.repository");
const appointment_repository_1 = require("../../domain/repositories/appointment.repository");
const add_prescription_usecase_1 = require("../../use-case/medical-record/add-prescription.usecase");
const prisma_module_1 = require("./prisma.module");
let MedicalRecordModule = class MedicalRecordModule {
};
exports.MedicalRecordModule = MedicalRecordModule;
exports.MedicalRecordModule = MedicalRecordModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [medical_record_controller_1.MedicalRecordController],
        providers: [
            {
                provide: medical_record_repository_1.MedicalRecordRepository,
                useClass: prisma_medical_record_repository_1.PrismaMedicalRecordRepository,
            },
            prisma_medical_record_repository_1.PrismaMedicalRecordRepository,
            finalize_appointment_usecase_1.FinalizeAppointmentUseCase,
            {
                provide: appointment_repository_1.AppointmentRepository,
                useClass: prisma_appointment_repository_1.PrismaAppointmentRepository,
            },
            prisma_appointment_repository_1.PrismaAppointmentRepository,
            add_prescription_usecase_1.AddPrescriptionUseCase,
        ],
        exports: [
            medical_record_repository_1.MedicalRecordRepository,
            prisma_medical_record_repository_1.PrismaMedicalRecordRepository,
            appointment_repository_1.AppointmentRepository,
            prisma_appointment_repository_1.PrismaAppointmentRepository,
            finalize_appointment_usecase_1.FinalizeAppointmentUseCase,
            add_prescription_usecase_1.AddPrescriptionUseCase,
        ],
    })
], MedicalRecordModule);
//# sourceMappingURL=medical-record.module.js.map