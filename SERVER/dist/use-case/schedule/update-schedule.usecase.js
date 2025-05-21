"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScheduleUseCase = void 0;
class UpdateScheduleUseCase {
    scheduleRepository;
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }
    async execute(data) {
        const schedule = await this.scheduleRepository.findById(data.id);
        if (!schedule) {
            throw new Error("Agenda não encontrada");
        }
        return await this.scheduleRepository.update(data.id, data);
    }
}
exports.UpdateScheduleUseCase = UpdateScheduleUseCase;
//# sourceMappingURL=update-schedule.usecase.js.map