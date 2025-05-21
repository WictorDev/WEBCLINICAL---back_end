import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";

export interface UserData {
  cpf: UniqueEntityCPF;
  name: string;
  email: string;
  password: string;
  companyId?: string;
  types: string[];
  active?: boolean;
}

export class User {
  constructor(private data: UserData) {}

  get cpf(): UniqueEntityCPF{
    return this.data.cpf;
  }

  set cpf(cpf: string) {
    if (!cpf) throw new Error("CPF é obrigatório.");
    this.data.cpf = new UniqueEntityCPF(cpf);
  }

  get name(): string{
    return this.data.name;
  }

  set name(name: string) {
    if (!name) throw new Error("Nome é obrigatório.");
    this.data.name = name;
  }

  get email(): string{
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
    if (!password) throw new Error("Senha é obrigatório.");
    this.data.password = password;
  }

  get companyId(): string | undefined {
    return this.data.companyId;
  }

  set companyId(companyId: string | undefined) {
    this.data.companyId = companyId;
  }

  get types(): string[] {
    return this.data.types;
  }

  set types(types: string[]) {
    if (!types || types.length === 0) throw new Error("Pelo menos um tipo é obrigatório.");
    this.data.types = types;
  }

  get active(): boolean | undefined {
    return this.data.active;
  }
  
  set active(value: boolean) {
    this.data.active = value;
  }

  toJSON() {
    return {
      cpf: this.cpf.toString(),
      name: this.name,
      email: this.email,
      password: this.password,
      companyId: this.companyId,
      types: this.types,
      active: this.active
    };
  }

  static create(data: UserData) {
    const user = new User(data);
    return {
      cpf: user.cpf.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      companyId: user.companyId,
      types: user.types,
      active: user.active
    };
  }
}
