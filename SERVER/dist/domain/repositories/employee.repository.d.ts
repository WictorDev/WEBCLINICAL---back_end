import { Employee } from "src/domain/entities/employee";
export declare abstract class EmployeeRepository {
    abstract create(employee: Employee): Promise<Employee>;
    abstract findByCpf(cpf: string): Promise<Employee | null>;
    abstract update(cpf: string, employee: Partial<Employee>): Promise<Employee>;
    abstract findAll(): Promise<Employee[]>;
    abstract delete(cpf: string): Promise<void>;
}
