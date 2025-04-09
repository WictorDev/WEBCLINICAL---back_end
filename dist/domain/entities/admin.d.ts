import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";
export interface AdminData {
    cpf: UniqueEntityCPF;
    name: string;
    typeId: string;
}
export declare class Admin {
    private data;
    constructor(data: AdminData);
    get cpf(): string;
    set cpf(cpf: string);
    get name(): string;
    set name(name: string);
    get typeId(): string;
    set typeId(typeId: string);
}
