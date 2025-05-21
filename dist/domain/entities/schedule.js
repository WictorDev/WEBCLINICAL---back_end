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
    get date() {
        return this.data.date;
    }
    set date(date) {
        if (!date)
            throw new Error("Data é obrigatória.");
        if (date < new Date())
            throw new Error("Data não pode ser no passado.");
        this.data.date = date;
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
    get duration() {
        return this.data.duration;
    }
    set duration(duration) {
        if (duration <= 0)
            throw new Error("Duração deve ser maior que zero.");
        this.data.duration = duration;
    }
    get totalSlots() {
        return this.data.totalSlots;
    }
    set totalSlots(totalSlots) {
        if (totalSlots <= 0)
            throw new Error("Total de vagas deve ser maior que zero.");
        this.data.totalSlots = totalSlots;
    }
    get availableSlots() {
        return this.data.availableSlots;
    }
    set availableSlots(availableSlots) {
        if (availableSlots < 0)
            throw new Error("Vagas disponíveis não podem ser negativas.");
        if (availableSlots > this.totalSlots)
            throw new Error("Vagas disponíveis não podem ser maiores que o total de vagas.");
        this.data.availableSlots = availableSlots;
    }
    get employeeId() {
        return this.data.employeeId;
    }
    set employeeId(employeeId) {
        if (!employeeId)
            throw new Error("ID do funcionário é obrigatório.");
        this.data.employeeId = employeeId;
    }
    get active() {
        return this.data.active;
    }
    set active(active) {
        this.data.active = active;
    }
    toJSON() {
        return {
            id: this.id,
            date: this.date,
            startTime: this.startTime,
            endTime: this.endTime,
            duration: this.duration,
            totalSlots: this.totalSlots,
            availableSlots: this.availableSlots,
            employeeId: this.employeeId
        };
    }
    static create(data) {
        return {
            id: data.id,
            date: data.date,
            startTime: data.startTime,
            endTime: data.endTime,
            duration: data.duration,
            totalSlots: data.totalSlots,
            availableSlots: data.availableSlots,
            employeeId: data.employeeId
        };
    }
}
exports.Schedule = Schedule;
//# sourceMappingURL=schedule.js.map