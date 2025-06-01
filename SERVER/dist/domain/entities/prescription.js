"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prescription = void 0;
class Prescription {
    data;
    constructor(data) {
        this.data = data;
    }
    get id() {
        return this.data.id;
    }
    get medication() {
        return this.data.medication;
    }
    set medication(medication) {
        if (!medication)
            throw new Error("Medicação é obrigatória.");
        this.data.medication = medication;
    }
    get dosage() {
        return this.data.dosage;
    }
    set dosage(dosage) {
        if (!dosage)
            throw new Error("Dosagem é obrigatória.");
        this.data.dosage = dosage;
    }
    get instructions() {
        return this.data.instructions;
    }
    set instructions(instructions) {
        if (!instructions)
            throw new Error("Instruções são obrigatórias.");
        this.data.instructions = instructions;
    }
    get medicalRecordId() {
        return this.data.medicalRecordId;
    }
    set medicalRecordId(medicalRecordId) {
        if (!medicalRecordId)
            throw new Error("ID do prontuário é obrigatório.");
        this.data.medicalRecordId = medicalRecordId;
    }
    toJSON() {
        return {
            id: this.id,
            medication: this.medication,
            dosage: this.dosage,
            instructions: this.instructions,
            medicalRecordId: this.medicalRecordId
        };
    }
    static create(data) {
        return {
            id: data.id,
            medication: data.medication,
            dosage: data.dosage,
            instructions: data.instructions,
            medicalRecordId: data.medicalRecordId
        };
    }
}
exports.Prescription = Prescription;
//# sourceMappingURL=prescription.js.map