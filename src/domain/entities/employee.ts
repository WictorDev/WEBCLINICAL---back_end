export interface EmployeeData {
  cpf: string;
  name: string;
  advice?: string;
  typeId: string;
  employeeTypeId?: string;
}

export class Employee {
  constructor(private data: EmployeeData) {}

  get cpf(): string {
    return this.data.cpf;
  }

  get name(): string {
    return this.data.name;
  }

  set name(name: string) {
    if (!name) throw new Error('Nome é obrigatório.');
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
    if (!typeId) throw new Error('typeId é obrigatório.');
    this.data.typeId = typeId;
  }

  get employeeTypeId(): string | undefined {
    return this.data.employeeTypeId;
  }

  set employeeTypeId(employeeTypeId: string | undefined) {
    this.data.employeeTypeId = employeeTypeId;
  }

  toJSON() {
    return {
      cpf: this.cpf,
      name: this.name,
      advice: this.advice,
      typeId: this.typeId,
      employeeTypeId: this.employeeTypeId || undefined
    };
  }

  static create(data: EmployeeData) {
    const employee = new Employee(data);
    return {
      cpf: employee.cpf,
      name: employee.name,
      advice: employee.advice,
      typeId: employee.typeId,
      employeeTypeId: employee.employeeTypeId || undefined
    };
  }
}
