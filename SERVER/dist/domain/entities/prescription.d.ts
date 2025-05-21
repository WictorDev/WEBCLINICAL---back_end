export interface PrescriptionData {
    id: string;
    medication: string;
    dosage: string;
    instructions: string;
    medicalRecordId: string;
}
export declare class Prescription {
    private data;
    constructor(data: PrescriptionData);
    get id(): string;
    get medication(): string;
    set medication(medication: string);
    get dosage(): string;
    set dosage(dosage: string);
    get instructions(): string;
    set instructions(instructions: string);
    get medicalRecordId(): string;
    set medicalRecordId(medicalRecordId: string);
    toJSON(): {
        id: string;
        medication: string;
        dosage: string;
        instructions: string;
        medicalRecordId: string;
    };
    static create(data: PrescriptionData): {
        id: string;
        medication: string;
        dosage: string;
        instructions: string;
        medicalRecordId: string;
    };
}
