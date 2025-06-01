export interface EmployeeTypeData {
    id: string;
    name: string;
}
export declare class EmployeeType {
    private data;
    constructor(data: EmployeeTypeData);
    get id(): string;
    set id(id: string);
    get name(): string;
    set name(name: string);
    toJSON(): {
        id: string;
        name: string;
    };
    static create(data: EmployeeTypeData): {
        id: string;
        name: string;
    };
}
