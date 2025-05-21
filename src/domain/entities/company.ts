import { UniqueEntityCnpj } from "src/core/entities/unique-entity-cnpj";

export interface CompanyData {
  name: string;
  cnpj: UniqueEntityCnpj;
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
    this.data.cnpj = new UniqueEntityCnpj(cnpj);
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

  toJSON() {
    return {
      name: this.name,
      cnpj: this.cnpj,
      email: this.email,
      phone: this.phone
    };
  }

  static create(data: CompanyData) {
    return {
      name: data.name,
      cnpj: data.cnpj.toString(),
      email: data.email,
      phone: data.phone
    };
  }
}
