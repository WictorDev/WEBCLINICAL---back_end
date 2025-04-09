import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";
export interface UserData {
    cpf: UniqueEntityCPF;
    name: string;
    email: string;
    password: string;
    companyId?: string;
    typeId?: string;
    active?: boolean;
}
export declare class User {
    private data;
    constructor(data: UserData);
    get cpf(): UniqueEntityCPF;
    set cpf(cpf: string);
    get name(): string;
    set name(name: string);
    get email(): string;
    set email(email: string);
    get password(): string;
    set password(password: string);
    get companyId(): string | undefined;
    set companyId(companyId: string);
    get typeId(): string | undefined;
    set typeId(typeId: string | undefined);
    get active(): boolean | undefined;
    set active(value: boolean);
}
