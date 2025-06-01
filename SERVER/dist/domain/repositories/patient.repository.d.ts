import { Patient } from "src/domain/entities/patient";
export declare abstract class PatientRepository {
    abstract create(patient: Patient): Promise<Patient>;
    abstract findByCpf(cpf: string): Promise<Patient | null>;
    abstract update(cpf: string, patient: Patient): Promise<Patient>;
    abstract findAll(): Promise<Patient[]>;
    abstract findByEmail(email: string): Promise<Patient | null>;
}
