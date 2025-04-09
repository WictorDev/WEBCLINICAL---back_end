import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";

export interface UserData {
  cpf: UniqueEntityCPF;
  name: string;
  email: string;
  password: string;
  companyId?: string;
  typeId?: string;
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

  set companyId(companyId: string) {
    if (!companyId) throw new Error("Empresa é obrigatório.");
    this.data.companyId = companyId;
  }

  get typeId(): string | undefined {
    return this.data.typeId;
  }

  set typeId(typeId: string | undefined) {
    
    this.data.typeId = typeId;
  }

  get active(): boolean | undefined {
    return this.data.active;
  }
  
  set active(value: boolean) {
    this.data.active = value;
  }
  

}
