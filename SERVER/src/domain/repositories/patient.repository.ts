import { Patient } from '../entities/patient';
import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';

export abstract class PatientRepository {
  abstract create(patient: Patient): Promise<Patient>;
  abstract findAll(): Promise<Patient[]>;
  abstract findByCpf(cpf: UniqueEntityCpf): Promise<Patient | null>;
  abstract findByEmail(email: string): Promise<Patient | null>;
  abstract update(cpf: UniqueEntityCpf, data: Partial<Patient>): Promise<Patient>;
} 