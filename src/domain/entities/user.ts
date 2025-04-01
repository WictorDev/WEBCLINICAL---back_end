import { Entity } from "src/core/entities/entity";
import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";

export interface UserData {
  cpf: UniqueEntityCPF;
  name: string;
  email: string;
  password: string;
  company: string;
  type: string;
}

export class User extends Entity<UserData> {
  constructor(data: UserData) {
        super({ ...data, cpf: new UniqueEntityCPF(data.cpf.toString()) });
  }
}
