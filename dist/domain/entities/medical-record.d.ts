export declare class MedicalRecord {
    id: string;
    symptoms: string;
    diagnosis: string;
    conduct: string;
    createdAt: Date;
    appointmentId: string;
    constructor(id: string, symptoms: string, diagnosis: string, conduct: string, createdAt: Date, appointmentId: string);
}
