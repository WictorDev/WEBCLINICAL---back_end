export interface MedicalRecordData {
    id: string;
    symptoms: string;
    diagnosis: string;
    conduct: string;
    createdAt: Date;
    appointmentId: string;
}
export declare class MedicalRecord {
    private data;
    constructor(data: MedicalRecordData);
    get id(): string;
    get symptoms(): string;
    set symptoms(symptoms: string);
    get diagnosis(): string;
    set diagnosis(diagnosis: string);
    get conduct(): string;
    set conduct(conduct: string);
    get createdAt(): Date;
    get appointmentId(): string;
    set appointmentId(appointmentId: string);
    toJSON(): {
        id: string;
        symptoms: string;
        diagnosis: string;
        conduct: string;
        createdAt: Date;
        appointmentId: string;
    };
    static create(data: MedicalRecordData): {
        id: string;
        symptoms: string;
        diagnosis: string;
        conduct: string;
        createdAt: Date;
        appointmentId: string;
    };
}
