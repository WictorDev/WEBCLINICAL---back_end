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
exports.CreateAppointmentUseCase = void 0;
const common_1 = require("@nestjs/common");
const tokens_constants_1 = require("../../infrastructure/constants/tokens.constants");
let CreateAppointmentUseCase = class CreateAppointmentUseCase {
    appointmentRepository;
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    async execute(appointment) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(appointment.startTime) || !timeRegex.test(appointment.endTime)) {
            throw new Error('Formato de hora inválido. Use o formato HH:mm.');
        }
        const existing = await this.appointmentRepository.findByEmployee(appointment.employeeId, appointment.date);
        const conflict = existing.some(a => a.startTime < appointment.endTime && appointment.startTime < a.endTime);
        if (conflict) {
            throw new Error('Conflito de horário para este funcionário.');
        }
        return this.appointmentRepository.create(appointment);
    }
};
exports.CreateAppointmentUseCase = CreateAppointmentUseCase;
exports.CreateAppointmentUseCase = CreateAppointmentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tokens_constants_1.APPOINTMENT_REPOSITORY_TOKEN)),
    __metadata("design:paramtypes", [Object])
], CreateAppointmentUseCase);
//# sourceMappingURL=create-appointment.usecase.js.map