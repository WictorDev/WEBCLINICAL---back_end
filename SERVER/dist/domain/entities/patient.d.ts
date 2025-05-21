import { UniqueEntityCpf } from "src/core/entities/unique-entity-cpf";
export interface PatientData {
    cpf: UniqueEntityCpf;
    name: string;
    email: string;
    password: string;
    type: string;
}
export declare class Patient {
    private data;
    constructor(data: PatientData);
    get cpf(): UniqueEntityCpf;
    set cpf(cpf: string);
    get name(): string;
    set name(name: string);
    get email(): string;
    set email(email: string);
    get password(): string;
    set password(password: string);
    get type(): string;
    set type(type: string);
    toJSON(): {
        cpf: string;
        name: string;
        email: string;
        type: string;
    };
    static create(data: PatientData): {
        cpf: string;
        name: string;
        email: string;
        password: string;
        type: string;
    };
}
