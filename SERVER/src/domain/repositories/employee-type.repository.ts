import { EmployeeType } from '../entities/employee-type';

export abstract class EmployeeTypeRepository {
  abstract create(employeeType: EmployeeType): Promise<EmployeeType>;
  abstract findAll(): Promise<EmployeeType[]>;
  abstract findById(id: string): Promise<EmployeeType | null>;
  abstract findByName(name: string): Promise<EmployeeType | null>;
} 