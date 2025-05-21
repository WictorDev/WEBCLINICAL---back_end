import { Admin } from "src/domain/entities/admin";
export declare abstract class AdminRepository {
    abstract create(admin: Admin): Promise<Admin>;
    abstract findByCpf(cpf: string): Promise<Admin | null>;
    abstract update(cpf: string, admin: Partial<Admin>): Promise<Admin>;
    abstract findAll(): Promise<Admin[]>;
}
