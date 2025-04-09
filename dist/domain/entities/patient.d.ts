import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";
export interface PatientData {
    cpf: UniqueEntityCPF;
    name: string;
    email: string;
    password: string;
    typeId: string;
}
export declare class Patient {
    private data;
    constructor(data: PatientData);
    get cpf(): string;
    set cpf(cpf: string);
    get name(): string;
    set name(name: string);
    get email(): string;
    set email(email: string);
    get password(): string;
    set password(password: string);
    get typeId(): string;
    set typeId(typeId: string);
}
