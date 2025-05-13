"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prescription = void 0;
class Prescription {
    id;
    medication;
    dosage;
    instructions;
    medicalRecordId;
    constructor(id, medication, dosage, instructions, medicalRecordId) {
        this.id = id;
        this.medication = medication;
        this.dosage = dosage;
        this.instructions = instructions;
        this.medicalRecordId = medicalRecordId;
    }
}
exports.Prescription = Prescription;
//# sourceMappingURL=prescription.js.map