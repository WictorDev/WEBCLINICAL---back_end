import { Type } from './type';
import { EmployeeType } from './employee-type';

export interface EmployeeData {
  cpf: string;
  name: string;
  advice?: string;
  typeId: string;
  employeeTypeId: string;
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

  get employeeTypeId(): string {
    return this.data.employeeTypeId;
  }

  set employeeTypeId(employeeTypeId: string) {
    if (!employeeTypeId) throw new Error('employeeTypeId é obrigatório.');
    this.data.employeeTypeId = employeeTypeId;
  }
}
