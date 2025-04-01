import { Entity } from "src/core/entities/entity";
import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";

export interface EmployeeData {
  cpf: UniqueEntityCPF;
  name: string;
  advice?: string; // CRM, CRO, etc. (Opcional)
  typeId: string; // Relacionamento com Type
  employeeTypeId: string; // Relacionamento com EmployeeType
}

export class Employee extends Entity<EmployeeData> {
  constructor(data: EmployeeData) {
    super({ ...data, cpf: new UniqueEntityCPF(data.cpf.toString()) });
  }
}
