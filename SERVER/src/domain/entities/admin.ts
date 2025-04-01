import { Entity } from "src/core/entities/entity";
import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";

export interface AdminData {
  cpf: UniqueEntityCPF;
  name: string;
  typeId: string; // Relacionamento com Type
}

export class Admin extends Entity<AdminData> {
  constructor(data: AdminData) {
    super({ ...data, cpf: new UniqueEntityCPF(data.cpf.toString()) });
  }
}