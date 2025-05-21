export interface EmployeeTypeData {
  id: string;
  name: string;
}

export class EmployeeType {
  constructor(private data: EmployeeTypeData) {}

  get id(): string {
    return this.data.id;
  }

  set id(id: string) {
    if (!id) throw new Error("ID é obrigatório.");
    this.data.id = id;
  }

  get name(): string {
    return this.data.name;
  }

  set name(name: string) {
    if (!name) throw new Error("Nome é obrigatório.");
    this.data.name = name;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name
    };
  }
  
  static create(data: EmployeeTypeData) {
    const employeeType = new EmployeeType(data);
    return {
      id: employeeType.id,
      name: employeeType.name
    };
  }
}
