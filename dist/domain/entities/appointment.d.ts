export declare enum AppointmentStatus {
    AVAILABLE = "AVAILABLE",
    SCHEDULED = "SCHEDULED",
    FINISHED = "FINISHED"
}
export interface AppointmentData {
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
    status: AppointmentStatus;
    scheduleId: string;
    patientId?: string | null;
    employeeId: string;
}
export declare class Appointment {
    private data;
    constructor(data: AppointmentData);
    get id(): string;
    get date(): Date;
    set date(date: Date);
    get startTime(): string;
    set startTime(startTime: string);
    get endTime(): string;
    set endTime(endTime: string);
    get status(): AppointmentStatus;
    set status(status: AppointmentStatus);
    get scheduleId(): string;
    set scheduleId(scheduleId: string);
    get patientId(): string | undefined | null;
    set patientId(patientId: string | undefined | null);
    get employeeId(): string;
    set employeeId(employeeId: string);
    toJSON(): {
        id: string;
        date: Date;
        startTime: string;
        endTime: string;
        status: AppointmentStatus;
        scheduleId: string;
        patientId: string | null | undefined;
        employeeId: string;
    };
    static create(data: AppointmentData): {
        id: string;
        date: Date;
        startTime: string;
        endTime: string;
        status: AppointmentStatus;
        scheduleId: string;
        patientId: string | null | undefined;
        employeeId: string;
    };
}
export interface AppointmentWithPatient {
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
    status: AppointmentStatus;
    scheduleId: string;
    patientId?: string | null;
    employeeId: string;
    patient?: {
        name: string;
    };
}
