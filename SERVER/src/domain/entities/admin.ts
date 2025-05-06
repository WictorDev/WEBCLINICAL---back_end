import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";

export interface AdminData {
  cpf: UniqueEntityCPF;
  name: string;
  type: string;
  password: string;
}

export class Admin {
  constructor(private data: AdminData) {}

  get cpf(): string {
    return this.data.cpf.toString();
  }

  set cpf(cpf: string) {
    if (!cpf) throw new Error("CPF é obrigatório.");
    this.data.cpf = new UniqueEntityCPF(cpf);
  }

  get name(): string {
    return this.data.name;
  }

  set name(name: string) {
    if (!name) throw new Error("Nome é obrigatório.");
    this.data.name = name;
  }

  get type(): string {
    return this.data.type;
  }

  set type(type: string) {
    if (!type) throw new Error("ID do Tipo é obrigatório.");
    this.data.type = type;
  }
}
