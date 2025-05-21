"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
class Schedule {
    data;
    constructor(data) {
        this.data = data;
    }
    get id() {
        return this.data.id;
    }
    get dayOfWeek() {
        return this.data.dayOfWeek;
    }
    set dayOfWeek(dayOfWeek) {
        if (dayOfWeek < 0 || dayOfWeek > 6)
            throw new Error("Dia da semana inválido.");
        this.data.dayOfWeek = dayOfWeek;
    }
    get startTime() {
        return this.data.startTime;
    }
    set startTime(startTime) {
        if (!startTime)
            throw new Error("Horário de início é obrigatório.");
        this.data.startTime = startTime;
    }
    get endTime() {
        return this.data.endTime;
    }
    set endTime(endTime) {
        if (!endTime)
            throw new Error("Horário de término é obrigatório.");
        this.data.endTime = endTime;
    }
    get employeeId() {
        return this.data.employeeId;
    }
    set employeeId(employeeId) {
        if (!employeeId)
            throw new Error("ID do funcionário é obrigatório.");
        this.data.employeeId = employeeId;
    }
    toJSON() {
        return {
            id: this.id,
            dayOfWeek: this.dayOfWeek,
            startTime: this.startTime,
            endTime: this.endTime,
            employeeId: this.employeeId
        };
    }
    static create(data) {
        return {
            id: data.id,
            dayOfWeek: data.dayOfWeek,
            startTime: data.startTime,
            endTime: data.endTime,
            employeeId: data.employeeId
        };
    }
}
exports.Schedule = Schedule;
//# sourceMappingURL=schedule.js.map