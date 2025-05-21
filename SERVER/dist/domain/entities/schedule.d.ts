export interface ScheduleData {
    id: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    employeeId: string;
}
export declare class Schedule {
    private data;
    constructor(data: ScheduleData);
    get id(): string;
    get dayOfWeek(): number;
    set dayOfWeek(dayOfWeek: number);
    get startTime(): string;
    set startTime(startTime: string);
    get endTime(): string;
    set endTime(endTime: string);
    get employeeId(): string;
    set employeeId(employeeId: string);
    toJSON(): {
        id: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        employeeId: string;
    };
    static create(data: ScheduleData): {
        id: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        employeeId: string;
    };
}
