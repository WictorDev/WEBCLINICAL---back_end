"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
class Schedule {
    id;
    dayOfWeek;
    startTime;
    endTime;
    employeeId;
    constructor(id, dayOfWeek, startTime, endTime, employeeId) {
        this.id = id;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
        this.employeeId = employeeId;
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