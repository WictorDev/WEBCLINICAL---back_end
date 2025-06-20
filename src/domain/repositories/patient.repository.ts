import { Patient } from "src/domain/entities/patient";

export abstract class PatientRepository {
  abstract create(patient: Patient): Promise<Patient>;
  abstract findAll(): Promise<Patient[]>;
  abstract findByCpf(cpf: string): Promise<Patient | null>;
  abstract findByEmail(email: string): Promise<Patient | null>;
  abstract update(cpf: string, data: Partial<Patient>): Promise<Patient>;
  abstract recoveryPassword(email: string, password: string): Promise<void>;
} 