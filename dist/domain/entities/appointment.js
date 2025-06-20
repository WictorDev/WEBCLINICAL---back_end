"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = exports.AppointmentStatus = void 0;
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["AVAILABLE"] = "AVAILABLE";
    AppointmentStatus["SCHEDULED"] = "SCHEDULED";
    AppointmentStatus["FINISHED"] = "FINISHED";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
class Appointment {
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
    get status() {
        return this.data.status;
    }
    set status(status) {
        if (!status)
            throw new Error("Status é obrigatório.");
        if (!Object.values(AppointmentStatus).includes(status)) {
            throw new Error(`Status inválido. Use um dos seguintes: ${Object.values(AppointmentStatus).join(', ')}`);
        }
        this.data.status = status;
    }
    get scheduleId() {
        return this.data.scheduleId;
    }
    set scheduleId(scheduleId) {
        if (!scheduleId)
            throw new Error("ID da agenda é obrigatório.");
        this.data.scheduleId = scheduleId;
    }
    get patientId() {
        return this.data.patientId;
    }
    set patientId(patientId) {
        this.data.patientId = patientId;
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
            date: this.date,
            startTime: this.startTime,
            endTime: this.endTime,
            status: this.status,
            scheduleId: this.scheduleId,
            patientId: this.patientId,
            employeeId: this.employeeId
        };
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