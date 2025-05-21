export declare class Prescription {
    id: string;
    medication: string;
    dosage: string;
    instructions: string;
    medicalRecordId: string;
    constructor(id: string, medication: string, dosage: string, instructions: string, medicalRecordId: string);
    static create(data: {
        id: string;
        medication: string;
        dosage: string;
        instructions: string;
        medicalRecordId: string;
    }): {
        id: string;
        medication: string;
        dosage: string;
        instructions: string;
        medicalRecordId: string;
    };
}
