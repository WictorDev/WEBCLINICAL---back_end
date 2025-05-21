import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";
export interface AdminData {
    cpf: UniqueEntityCPF;
    name: string;
    type: string;
}
export declare class Admin {
    private data;
    constructor(data: AdminData);
    get cpf(): string;
    set cpf(cpf: string);
    get name(): string;
    set name(name: string);
    get type(): string;
    set type(type: string);
    toJSON(): {
        cpf: string;
        name: string;
        type: string;
    };
    static create(data: AdminData): {
        cpf: string;
        name: string;
        type: string;
    };
}
