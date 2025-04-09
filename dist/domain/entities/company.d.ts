import { UniqueEntitycnpj } from "src/core/entities/unique-entity-cnpj";
export interface CompanyData {
    name: string;
    cnpj: UniqueEntitycnpj;
    email: string;
    phone: string;
}
export declare class Company {
    private data;
    constructor(data: CompanyData);
    get name(): string;
    set name(name: string);
    get cnpj(): string;
    set cnpj(cnpj: string);
    get email(): string;
    set email(email: string);
    get phone(): string;
    set phone(phone: string);
}
