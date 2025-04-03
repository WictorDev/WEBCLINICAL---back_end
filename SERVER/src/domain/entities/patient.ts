import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";

export interface PatientData {
  cpf: UniqueEntityCPF;
  name: string;
  email: string;
  password: string;
  typeId: string;
}

export class Patient {
  constructor(private data: PatientData) {}

  get cpf(): string | undefined {
    return this.data.cpf.toString();
  }

  set cpf(cpf: string) {
    if (!cpf) throw new Error("CPF é obrigatório.");
    this.data.cpf = new UniqueEntityCPF(cpf.toString());
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

  get typeId(): string | undefined {
    return this.data.typeId;
  }

  set typeId(typeId: string) {
    if (!typeId) throw new Error("Tipo é obrigatório.");
    this.data.typeId = typeId;
  }
}
