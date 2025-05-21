"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecord = void 0;
class MedicalRecord {
    id;
    symptoms;
    diagnosis;
    conduct;
    createdAt;
    appointmentId;
    constructor(id, symptoms, diagnosis, conduct, createdAt, appointmentId) {
        this.id = id;
        this.symptoms = symptoms;
        this.diagnosis = diagnosis;
        this.conduct = conduct;
        this.createdAt = createdAt;
        this.appointmentId = appointmentId;
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