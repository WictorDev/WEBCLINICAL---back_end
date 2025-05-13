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
exports.FindAvailableSchedulesUseCase = void 0;
const common_1 = require("@nestjs/common");
const tokens_constants_1 = require("../../infrastructure/constants/tokens.constants");
let FindAvailableSchedulesUseCase = class FindAvailableSchedulesUseCase {
    scheduleRepository;
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }
    async execute(employeeId, dayOfWeek) {
        if (dayOfWeek < 0 || dayOfWeek > 6) {
            throw new Error('Dia da semana inválido. Deve ser entre 0 (Domingo) e 6 (Sábado).');
        }
        return this.scheduleRepository.findAvailableByEmployee(employeeId, dayOfWeek);
    }
};
exports.FindAvailableSchedulesUseCase = FindAvailableSchedulesUseCase;
exports.FindAvailableSchedulesUseCase = FindAvailableSchedulesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tokens_constants_1.SCHEDULE_REPOSITORY_TOKEN)),
    __metadata("design:paramtypes", [Object])
], FindAvailableSchedulesUseCase);
//# sourceMappingURL=find-available-schedules.usecase.js.map