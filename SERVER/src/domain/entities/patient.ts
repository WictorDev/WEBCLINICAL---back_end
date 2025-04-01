import { Entity } from "src/core/entities/entity";
import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";

export interface PatientData {
  cpf: UniqueEntityCPF;
  name: string;
  email: string;
  password: string;
  typeId: string; // Relacionamento com Type
}

export class Patient extends Entity<PatientData> {
  constructor(data: PatientData) {
    super({ ...data, cpf: new UniqueEntityCPF(data.cpf.toString()) });
  }
}
