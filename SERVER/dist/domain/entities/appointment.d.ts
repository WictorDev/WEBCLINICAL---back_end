export declare class Appointment {
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
    status: string;
    scheduleId: string;
    patientId: string;
    employeeId: string;
    constructor(id: string, date: Date, startTime: string, endTime: string, status: string, scheduleId: string, patientId: string, employeeId: string);
    static create(data: {
        id: string;
        date: Date;
        startTime: string;
        endTime: string;
        status: string;
        scheduleId: string;
        patientId: string;
        employeeId: string;
    }): {
        id: string;
        date: Date;
        startTime: string;
        endTime: string;
        status: string;
        scheduleId: string;
        patientId: string;
        employeeId: string;
    };
}
