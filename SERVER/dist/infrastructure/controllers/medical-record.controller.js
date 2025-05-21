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
exports.MedicalRecordController = void 0;
const common_1 = require("@nestjs/common");
const finalize_appointment_usecase_1 = require("../../use-case/appointment/finalize-appointment.usecase");
const jwt_guard_1 = require("../auth/jwt.guard");
const tokens_constants_1 = require("../constants/tokens.constants");
let MedicalRecordController = class MedicalRecordController {
    finalizeAppointment;
    medicalRecordRepository;
    constructor(finalizeAppointment, medicalRecordRepository) {
        this.finalizeAppointment = finalizeAppointment;
        this.medicalRecordRepository = medicalRecordRepository;
    }
    async finalize(body) {
        return this.finalizeAppointment.execute(body.appointmentId, {
            symptoms: body.symptoms,
            diagnosis: body.diagnosis,
            conduct: body.conduct,
            appointmentId: body.appointmentId,
        });
    }
    async getByAppointment(appointmentId) {
        return this.medicalRecordRepository.findByAppointment(appointmentId);
    }
};
exports.MedicalRecordController = MedicalRecordController;
__decorate([
    (0, common_1.Post)('finalize'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "finalize", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('appointmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "getByAppointment", null);
exports.MedicalRecordController = MedicalRecordController = __decorate([
    (0, common_1.Controller)('/api/medical-records'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(1, (0, common_1.Inject)(tokens_constants_1.MEDICAL_RECORD_REPOSITORY_TOKEN)),
    __metadata("design:paramtypes", [finalize_appointment_usecase_1.FinalizeAppointmentUseCase, Object])
], MedicalRecordController);
//# sourceMappingURL=medical-record.controller.js.map