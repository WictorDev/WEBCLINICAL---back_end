export interface ScheduleData {
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
    duration: number;
    totalSlots: number;
    availableSlots: number;
    employeeId: string;
    active: boolean;
}
export declare class Schedule {
    private data;
    constructor(data: ScheduleData);
    get id(): string;
    get date(): Date;
    set date(date: Date);
    get startTime(): string;
    set startTime(startTime: string);
    get endTime(): string;
    set endTime(endTime: string);
    get duration(): number;
    set duration(duration: number);
    get totalSlots(): number;
    set totalSlots(totalSlots: number);
    get availableSlots(): number;
    set availableSlots(availableSlots: number);
    get employeeId(): string;
    set employeeId(employeeId: string);
    get active(): boolean;
    set active(active: boolean);
    toJSON(): {
        id: string;
        date: Date;
        startTime: string;
        endTime: string;
        duration: number;
        totalSlots: number;
        availableSlots: number;
        employeeId: string;
    };
    static create(data: ScheduleData): {
        id: string;
        date: Date;
        startTime: string;
        endTime: string;
        duration: number;
        totalSlots: number;
        availableSlots: number;
        employeeId: string;
    };
}
