"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const common_1 = require("@nestjs/common");
const create_appointment_usecase_1 = require("../../use-case/appointment/create-appointment.usecase");
const find_employee_appointments_usecase_1 = require("../../use-case/appointment/find-employee-appointments.usecase");
const finalize_appointment_usecase_1 = require("../../use-case/appointment/finalize-appointment.usecase");
const update_appointment_status_usecase_1 = require("../../use-case/appointment/update-appointment-status.usecase");
const appointment_1 = require("../../domain/entities/appointment");
const jwt_guard_1 = require("../auth/jwt.guard");
const crypto_1 = require("crypto");
const find_patient_appointments_usecase_1 = require("../../use-case/appointment/find-patient-appointments.usecase");
let AppointmentController = class AppointmentController {
    createAppointment;
    findEmployeeAppointments;
    finalizeAppointment;
    updateAppointmentStatus;
    findPatientAppointments;
    constructor(createAppointment, findEmployeeAppointments, finalizeAppointment, updateAppointmentStatus, findPatientAppointments) {
        this.createAppointment = createAppointment;
        this.findEmployeeAppointments = findEmployeeAppointments;
        this.finalizeAppointment = finalizeAppointment;
        this.updateAppointmentStatus = updateAppointmentStatus;
        this.findPatientAppointments = findPatientAppointments;
    }
    async create(body) {
        const appointment = new appointment_1.Appointment({
            id: (0, crypto_1.randomUUID)(),
            date: new Date(body.date),
            startTime: body.startTime,
            endTime: body.endTime,
            status: body.status || 'PENDENTE',
            scheduleId: body.scheduleId,
            patientId: body.patientId,
            employeeId: body.employeeId
        });
        return this.createAppointment.execute(appointment);
    }
    async getByEmployee(employeeId, date) {
        return this.findEmployeeAppointments.execute(employeeId, date ? new Date(date) : undefined);
    }
    async finalizeAppointmentRecord(id, medicalRecordData) {
        return this.finalizeAppointment.execute(id, medicalRecordData);
    }
    async updateStatus(id, body) {
        return this.updateAppointmentStatus.execute(id, body.status);
    }
    async getByPatient(patientId) {
        return this.findPatientAppointments.execute(patientId);
    }
    async getAvailableBySchedule(scheduleId) {
        return this.findEmployeeAppointments.executeByScheduleIdAndStatus(scheduleId, 'disponivel');
    }
};
exports.AppointmentController = AppointmentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('employee'),
    __param(0, (0, common_1.Query)('employeeId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getByEmployee", null);
__decorate([
    (0, common_1.Patch)(':id/finalize'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "finalizeAppointmentRecord", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getByPatient", null);
__decorate([
    (0, common_1.Get)('available'),
    __param(0, (0, common_1.Query)('scheduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getAvailableBySchedule", null);
exports.AppointmentController = AppointmentController = __decorate([
    (0, common_1.Controller)('/api/appointments'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [create_appointment_usecase_1.CreateAppointmentUseCase,
        find_employee_appointments_usecase_1.FindEmployeeAppointmentsUseCase,
        finalize_appointment_usecase_1.FinalizeAppointmentUseCase,
        update_appointment_status_usecase_1.UpdateAppointmentStatusUseCase,
        find_patient_appointments_usecase_1.FindPatientAppointmentsUseCase])
], AppointmentController);
//# sourceMappingURL=appointment.controller.js.map