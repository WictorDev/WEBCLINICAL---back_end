import UniqueEntityCPF from "src/core/entities/unique-entity-cpf";

export interface EmployeeData {
  cpf: UniqueEntityCPF;
  name: string;
  advice?: string;
  typeId: string;
  employeeTypeId: string;
}

export class Employee {
  constructor(private data: EmployeeData) {}

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

  get advice(): string | undefined {
    return this.data.advice;
  }

  set advice(advice: string | undefined) {
    this.data.advice = advice;
  }

  get typeId(): string {
    return this.data.typeId;
  }

  set typeId(typeId: string) {
    if (!typeId) throw new Error("ID do Tipo é obrigatório.");
    this.data.typeId = typeId;
  }

  get employeeTypeId(): string {
    return this.data.employeeTypeId;
  }

  set employeeTypeId(employeeTypeId: string) {
    if (!employeeTypeId) throw new Error("ID do Tipo de Funcionário é obrigatório.");
    this.data.employeeTypeId = employeeTypeId;
  }
}
