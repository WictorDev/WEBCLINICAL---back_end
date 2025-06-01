"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecord = void 0;
class MedicalRecord {
    data;
    constructor(data) {
        this.data = data;
    }
    get id() {
        return this.data.id;
    }
    get symptoms() {
        return this.data.symptoms;
    }
    set symptoms(symptoms) {
        if (!symptoms)
            throw new Error("Sintomas são obrigatórios.");
        this.data.symptoms = symptoms;
    }
    get diagnosis() {
        return this.data.diagnosis;
    }
    set diagnosis(diagnosis) {
        if (!diagnosis)
            throw new Error("Diagnóstico é obrigatório.");
        this.data.diagnosis = diagnosis;
    }
    get conduct() {
        return this.data.conduct;
    }
    set conduct(conduct) {
        if (!conduct)
            throw new Error("Conduta é obrigatória.");
        this.data.conduct = conduct;
    }
    get createdAt() {
        return this.data.createdAt;
    }
    get appointmentId() {
        return this.data.appointmentId;
    }
    set appointmentId(appointmentId) {
        if (!appointmentId)
            throw new Error("ID do agendamento é obrigatório.");
        this.data.appointmentId = appointmentId;
    }
    toJSON() {
        return {
            id: this.id,
            symptoms: this.symptoms,
            diagnosis: this.diagnosis,
            conduct: this.conduct,
            createdAt: this.createdAt,
            appointmentId: this.appointmentId
        };
    }
    static create(data) {
        return {
            id: data.id,
            symptoms: data.symptoms,
            diagnosis: data.diagnosis,
            conduct: data.conduct,
            createdAt: data.createdAt,
            appointmentId: data.appointmentId
        };
    }
}
exports.MedicalRecord = MedicalRecord;
//# sourceMappingURL=medical-record.js.map