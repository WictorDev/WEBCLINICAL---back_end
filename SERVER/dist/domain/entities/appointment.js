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
}
exports.Appointment = Appointment;
//# sourceMappingURL=appointment.js.map