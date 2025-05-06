import { Employee } from '../entities/employee';

export abstract class EmployeeRepository {
  abstract create(employee: Employee): Promise<Employee>;
  abstract findAll(): Promise<Employee[]>;
  abstract findByCpf(cpf: string): Promise<Employee | null>;
  abstract update(cpf: string, data: Partial<Employee>): Promise<Employee>;
} 