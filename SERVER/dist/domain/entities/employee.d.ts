import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";
export interface EmployeeData {
    cpf: UniqueEntityCPF;
    name: string;
    advice?: string;
    typeId: string;
    employeeTypeId: string;
}
export declare class Employee {
    private data;
    constructor(data: EmployeeData);
    get cpf(): string;
    set cpf(cpf: string);
    get name(): string;
    set name(name: string);
    get advice(): string | undefined;
    set advice(advice: string | undefined);
    get typeId(): string;
    set typeId(typeId: string);
    get employeeTypeId(): string;
    set employeeTypeId(employeeTypeId: string);
}
