import { UniqueEntitycnpj } from "src/core/entities/unique-entity-cnpj";

export interface CompanyData {
  name: string;
  cnpj: UniqueEntitycnpj;
  email: string;
  phone: string;
}

export class Company {
  constructor(private data: CompanyData) {}

  get name(): string {
    return this.data.name;
  }

  set name(name: string) {
    if (!name) throw new Error("Nome da empresa é obrigatório.");
    this.data.name = name;
  }

  get cnpj(): string {
    return this.data.cnpj.toString();
  }

  set cnpj(cnpj: string) {
    if (!cnpj) throw new Error("CNPJ é obrigatório.");
    this.data.cnpj = new UniqueEntitycnpj(cnpj);
  }

  get email(): string {
    return this.data.email;
  }

  set email(email: string) {
    if (!email) throw new Error("Email da empresa é obrigatório.");
    this.data.email = email;
  }

  get phone(): string {
    return this.data.phone;
  }

  set phone(phone: string) {
    if (!phone) throw new Error("Telefone da empresa é obrigatório.");
    this.data.phone = phone;
  }
}
