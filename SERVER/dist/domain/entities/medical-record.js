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
}
exports.MedicalRecord = MedicalRecord;
//# sourceMappingURL=medical-record.js.map