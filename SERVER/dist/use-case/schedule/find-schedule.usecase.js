"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindScheduleUseCase = void 0;
class FindScheduleUseCase {
    scheduleRepository;
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }
    async findById(id) {
        return await this.scheduleRepository.findById(id);
    }
    async findAll() {
        return await this.scheduleRepository.findAll();
    }
    async findByEmployeeId(employeeId) {
        return await this.scheduleRepository.findByEmployeeId(employeeId);
    }
    async findAvailableByEmployeeId(employeeId, active = true) {
        return await this.scheduleRepository.findAvailableByEmployeeId(employeeId, active);
    }
    async findByDate(employeeId, date) {
        return await this.scheduleRepository.findByDate(employeeId, date);
    }
    async findAvailableByDate(employeeId, date, active = true) {
        return await this.scheduleRepository.findAvailableByDate(employeeId, date, active);
    }
}
exports.FindScheduleUseCase = FindScheduleUseCase;
//# sourceMappingURL=find-schedule.usecase.js.map