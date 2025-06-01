export interface EmployeeData {
    cpf: string;
    name: string;
    advice?: string;
    typeId: string;
    employeeTypeId?: string;
}
export declare class Employee {
    private data;
    constructor(data: EmployeeData);
    get cpf(): string;
    get name(): string;
    set name(name: string);
    get advice(): string | undefined;
    set advice(advice: string | undefined);
    get typeId(): string;
    set typeId(typeId: string);
    get employeeTypeId(): string | undefined;
    set employeeTypeId(employeeTypeId: string | undefined);
    toJSON(): {
        cpf: string;
        name: string;
        advice: string | undefined;
        typeId: string;
        employeeTypeId: string | undefined;
    };
    static create(data: EmployeeData): {
        cpf: string;
        name: string;
        advice: string | undefined;
        typeId: string;
        employeeTypeId: string | undefined;
    };
}
