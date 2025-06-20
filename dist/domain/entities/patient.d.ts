import UniqueEntityCpf from "src/core/entities/unique-entity-cpf";
export interface PatientData {
    cpf: UniqueEntityCpf;
    name: string;
    email: string;
    password: string;
    typeId: string;
    phoneNumber: string;
}
export declare class Patient {
    private data;
    constructor(data: PatientData);
    get cpf(): string;
    get name(): string;
    set name(name: string);
    get email(): string;
    set email(email: string);
    get password(): string;
    set password(password: string);
    get typeId(): string;
    set typeId(typeId: string);
    get phoneNumber(): string;
    set phoneNumber(phoneNumber: string);
    toJSON(): {
        cpf: string;
        name: string;
        email: string;
        typeId: string;
        phoneNumber: string;
    };
    static create(data: PatientData): {
        cpf: string;
        name: string;
        email: string;
        password: string;
        typeId: string;
        phoneNumber: string;
    };
}
