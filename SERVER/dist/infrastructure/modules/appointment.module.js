"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma.module");
const appointment_controller_1 = require("../controllers/appointment.controller");
const prisma_appointment_repository_1 = require("../db/repositories/prisma-appointment.repository");
const appointment_repository_1 = require("../../domain/repositories/appointment.repository");
const create_appointment_usecase_1 = require("../../use-case/appointment/create-appointment.usecase");
const cancel_appointment_usecase_1 = require("../../use-case/appointment/cancel-appointment.usecase");
const update_appointment_status_usecase_1 = require("../../use-case/appointment/update-appointment-status.usecase");
const finalize_appointment_usecase_1 = require("../../use-case/appointment/finalize-appointment.usecase");
const find_employee_appointments_usecase_1 = require("../../use-case/appointment/find-employee-appointments.usecase");
const find_patient_appointments_usecase_1 = require("../../use-case/appointment/find-patient-appointments.usecase");
const schedule_module_1 = require("./schedule.module");
const medical_record_module_1 = require("./medical-record.module");
let AppointmentModule = class AppointmentModule {
};
exports.AppointmentModule = AppointmentModule;
exports.AppointmentModule = AppointmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            schedule_module_1.ScheduleModule,
            medical_record_module_1.MedicalRecordModule,
        ],
        controllers: [appointment_controller_1.AppointmentController],
        providers: [
            {
                provide: appointment_repository_1.AppointmentRepository,
                useClass: prisma_appointment_repository_1.PrismaAppointmentRepository,
            },
            prisma_appointment_repository_1.PrismaAppointmentRepository,
            create_appointment_usecase_1.CreateAppointmentUseCase,
            cancel_appointment_usecase_1.CancelAppointmentUseCase,
            update_appointment_status_usecase_1.UpdateAppointmentStatusUseCase,
            finalize_appointment_usecase_1.FinalizeAppointmentUseCase,
            find_employee_appointments_usecase_1.FindEmployeeAppointmentsUseCase,
            find_patient_appointments_usecase_1.FindPatientAppointmentsUseCase,
        ],
        exports: [
            appointment_repository_1.AppointmentRepository,
            prisma_appointment_repository_1.PrismaAppointmentRepository,
            create_appointment_usecase_1.CreateAppointmentUseCase,
            cancel_appointment_usecase_1.CancelAppointmentUseCase,
            update_appointment_status_usecase_1.UpdateAppointmentStatusUseCase,
            finalize_appointment_usecase_1.FinalizeAppointmentUseCase,
            find_employee_appointments_usecase_1.FindEmployeeAppointmentsUseCase,
            find_patient_appointments_usecase_1.FindPatientAppointmentsUseCase,
        ],
    })
], AppointmentModule);
//# sourceMappingURL=appointment.module.js.map