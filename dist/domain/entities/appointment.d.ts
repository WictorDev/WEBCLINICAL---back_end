export interface AppointmentData {
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
    status: string;
    scheduleId?: string;
    patientId: string;
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
    get status(): string;
    set status(status: string);
    get scheduleId(): string | undefined;
    set scheduleId(scheduleId: string | undefined);
    get patientId(): string;
    set patientId(patientId: string);
    get employeeId(): string;
    set employeeId(employeeId: string);
    toJSON(): {
        id: string;
        date: Date;
        startTime: string;
        endTime: string;
        status: string;
        scheduleId: string | undefined;
        patientId: string;
        employeeId: string;
    };
    static create(data: AppointmentData): {
        id: string;
        date: Date;
        startTime: string;
        endTime: string;
        status: string;
        scheduleId: string | undefined;
        patientId: string;
        employeeId: string;
    };
}
