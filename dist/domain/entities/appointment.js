"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
class Appointment {
    id;
    date;
    startTime;
    endTime;
    status;
    scheduleId;
    patientId;
    employeeId;
    constructor(id, date, startTime, endTime, status, scheduleId, patientId, employeeId) {
        this.id = id;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
        this.scheduleId = scheduleId;
        this.patientId = patientId;
        this.employeeId = employeeId;
    }
    static create(data) {
        return {
            id: data.id,
            date: data.date,
            startTime: data.startTime,
            endTime: data.endTime,
            status: data.status,
            scheduleId: data.scheduleId,
            patientId: data.patientId,
            employeeId: data.employeeId
        };
    }
}
exports.Appointment = Appointment;
//# sourceMappingURL=appointment.js.map