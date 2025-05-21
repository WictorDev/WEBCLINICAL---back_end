export declare class Schedule {
    id: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    employeeId: string;
    constructor(id: string, dayOfWeek: number, startTime: string, endTime: string, employeeId: string);
    static create(data: {
        id: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        employeeId: string;
    }): {
        id: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        employeeId: string;
    };
}
