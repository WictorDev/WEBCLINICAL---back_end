import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";

export interface UserData {
  cpf: UniqueEntityCPF;
  name: string;
  email: string;
  password: string;
  company: string;
  typeId: string;
}

export class User {
  constructor(private data: UserData) {}

  get cpf(): string | undefined {
    return this.data.cpf.toString();
  }

  set cpf(cpf: string) {
    if (!cpf) throw new Error("CPF é obrigatório.");
    this.data.cpf = new UniqueEntityCPF(cpf);
  }

  get name(): string | undefined {
    return this.data.name;
  }

  set name(name: string) {
    if (!name) throw new Error("Nome é obrigatório.");
    this.data.name = name;
  }

  get email(): string | undefined {
    return this.data.email;
  }

  set email(email: string) {
    if (!email) throw new Error("Email é obrigatório.");
    this.data.email = email;
  }

  get password(): string | undefined {
    return this.data.password;
  }

  set password(password: string) {
    if (!password) throw new Error("Senha é obrigatório.");
    this.data.password = password;
  }

  get company(): string | undefined {
    return this.data.company;
  }

  set company(company: string) {
    if (!company) throw new Error("Empresa é obrigatório.");
    this.data.company = company;
  }

  get typeId(): string | undefined {
    return this.data.typeId;
  }

  set typeId(typeId: string) {
    if (!typeId) throw new Error("Tipo é obrigatório.");
    this.data.typeId = typeId;
  }

}
