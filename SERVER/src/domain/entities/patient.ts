import UniqueEntityCpf from "src/core/entities/unique-entity-cpf";

export interface PatientData {
  cpf: UniqueEntityCpf;
  name: string;
  email: string;
  password: string;
  typeId: string;
}

export class Patient {
  constructor(private data: PatientData) {}

  get cpf(): string {
    return this.data.cpf.toString();
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
    if (!email.includes('@')) throw new Error("Email inválido.");
    this.data.email = email;
  }

  get password(): string {
    return this.data.password;
  }

  set password(password: string) {
    if (!password) throw new Error("Senha é obrigatória.");
    if (password.length < 6) throw new Error("Senha deve ter no mínimo 6 caracteres.");
    this.data.password = password;
  }

  get typeId(): string {
    return this.data.typeId;
  }

  set typeId(typeId: string) {
    if (!typeId) throw new Error("Tipo é obrigatório.");
    this.data.typeId = typeId;
  }

  toJSON() {
    return {
      cpf: this.cpf,
      name: this.name,
      email: this.email,
      typeId: this.typeId
    };
  }

  static create(data: PatientData) {
    return {
      cpf: data.cpf.toString(),
      name: data.name,
      email: data.email,
      password: data.password,
      typeId: data.typeId
    };
  }
}
