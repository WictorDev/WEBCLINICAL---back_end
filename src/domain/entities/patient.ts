import { UniqueEntityCpf } from "src/core/entities/unique-entity-cpf";

export interface PatientData {
  cpf: UniqueEntityCpf;
  name: string;
  email: string;
  password: string;
  type: string; 
}

export class Patient {
  constructor(private data: PatientData) {}

  get cpf(): UniqueEntityCpf {
    return this.data.cpf;
  }

  set cpf(cpf: string) {
    if (!cpf) throw new Error("CPF é obrigatório.");
    this.data.cpf = new UniqueEntityCpf(cpf);
  }

  get name(): string {
    return this.data.name;
  }

  set name(name: string) {
    if (!name) throw new Error("Nome é obrigatório.");
    this.data.name = name;
  }

  get email(): string {
    return this.data.email;
  }

  set email(email: string) {
    if (!email) throw new Error("Email é obrigatório.");
    this.data.email = email;
  }

  get password(): string {
    return this.data.password;
  }

  set password(password: string) {
    if (!password) throw new Error("Senha é obrigatória.");
    this.data.password = password;
  }

  get type(): string {
    return this.data.type;
  }

  set type(type: string) {
    if (!type) throw new Error("Tipo é obrigatório.");
    this.data.type = type;
  }

  toJSON() {
    return {
      cpf: this.cpf.toString(),
      name: this.name,
      email: this.email,
      type: this.type
    };
  }

  static create(data: PatientData) {
    return {
      cpf: data.cpf.toString(),
      name: data.name,
      email: data.email,
      password: data.password,
      type: data.type
    };
  }
}
