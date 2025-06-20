"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma.module");
const patient_controller_1 = require("../controllers/patient.controller");
const prisma_patient_repository_1 = require("../db/repositories/prisma-patient.repository");
const create_patient_usecase_1 = require("../../use-case/patient/create-patient.usecase");
const find_patient_usecase_1 = require("../../use-case/patient/find-patient.usecase");
const find_patient_by_cpf_usecase_1 = require("../../use-case/patient/find-patient-by-cpf.usecase");
const find_patient_by_email_usecase_1 = require("../../use-case/patient/find-patient-by-email.usecase");
const update_patient_usecase_1 = require("../../use-case/patient/update-patient.usecase");
const recovery_password_usecase_1 = require("../../use-case/patient/recovery-password.usecase");
const confirm_patient_registration_usecase_1 = require("../../use-case/patient/confirm-patient-registration.usecase");
const patient_repository_1 = require("../../domain/repositories/patient.repository");
const type_module_1 = require("./type.module");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("./user.module");
const email_service_1 = require("../../core/services/email.service");
let PatientModule = class PatientModule {
};
exports.PatientModule = PatientModule;
exports.PatientModule = PatientModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            type_module_1.TypeModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'your-secret-key',
                signOptions: { expiresIn: '24h' },
            }),
            (0, common_1.forwardRef)(() => user_module_1.UserModule)
        ],
        controllers: [patient_controller_1.PatientController],
        providers: [
            {
                provide: patient_repository_1.PatientRepository,
                useClass: prisma_patient_repository_1.PrismaPatientRepository,
            },
            prisma_patient_repository_1.PrismaPatientRepository,
            create_patient_usecase_1.CreatePatientUseCase,
            find_patient_usecase_1.FindPatientUseCase,
            find_patient_by_cpf_usecase_1.FindPatientByCpfUseCase,
            find_patient_by_email_usecase_1.FindPatientByEmailUseCase,
            update_patient_usecase_1.UpdatePatientUseCase,
            recovery_password_usecase_1.RecoveryPasswordUseCase,
            confirm_patient_registration_usecase_1.ConfirmPatientRegistrationUseCase,
            email_service_1.EmailService,
        ],
        exports: [
            patient_repository_1.PatientRepository,
            prisma_patient_repository_1.PrismaPatientRepository,
            create_patient_usecase_1.CreatePatientUseCase,
            find_patient_usecase_1.FindPatientUseCase,
            find_patient_by_cpf_usecase_1.FindPatientByCpfUseCase,
            find_patient_by_email_usecase_1.FindPatientByEmailUseCase,
            update_patient_usecase_1.UpdatePatientUseCase,
            recovery_password_usecase_1.RecoveryPasswordUseCase,
            confirm_patient_registration_usecase_1.ConfirmPatientRegistrationUseCase,
        ],
    })
], PatientModule);
//# sourceMappingURL=patient.module.js.map