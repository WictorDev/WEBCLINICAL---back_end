import { Entity } from "src/core/entities/entity";

export interface EmployeeTypeData {
  id: string;
  name: string;
}

export class EmployeeType extends Entity<EmployeeTypeData> {
  constructor(data: EmployeeTypeData) {
    super(data);
  }
}
