import { Entity } from "src/core/entities/entity";
import {UniqueEntitycnpj} from "src/core/entities/unique-entity-cnpj";


export interface CompanyData {
    name: string;
    cnpj: UniqueEntitycnpj;
    email: string;
    phone: string;
}


export class Company extends Entity<CompanyData> {
    constructor(data: CompanyData) {
        super({...data , cnpj : new UniqueEntitycnpj(data.cnpj.toString())});
    }
}



