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
exports.UpdateAppointmentStatusUseCase = void 0;
const common_1 = require("@nestjs/common");
const tokens_constants_1 = require("../../infrastructure/constants/tokens.constants");
let UpdateAppointmentStatusUseCase = class UpdateAppointmentStatusUseCase {
    appointmentRepository;
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    async execute(appointmentId, status) {
        const validStatuses = ['PENDENTE', 'CONFIRMADO', 'FINALIZADO', 'CANCELADO'];
        if (!validStatuses.includes(status)) {
            throw new Error(`Status inválido. Use um dos seguintes: ${validStatuses.join(', ')}`);
        }
        const appointments = await this.appointmentRepository.findByEmployee('', undefined);
        const appointment = appointments.find(a => a.id === appointmentId);
        if (!appointment) {
            throw new Error('Agendamento não encontrado.');
        }
        if (status === 'FINALIZADO' && appointment.status !== 'CONFIRMADO') {
            throw new Error('Apenas agendamentos confirmados podem ser finalizados.');
        }
        return this.appointmentRepository.updateStatus(appointmentId, status);
    }
};
exports.UpdateAppointmentStatusUseCase = UpdateAppointmentStatusUseCase;
exports.UpdateAppointmentStatusUseCase = UpdateAppointmentStatusUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tokens_constants_1.APPOINTMENT_REPOSITORY_TOKEN)),
    __metadata("design:paramtypes", [Object])
], UpdateAppointmentStatusUseCase);
//# sourceMappingURL=update-appointment-status.usecase.js.map