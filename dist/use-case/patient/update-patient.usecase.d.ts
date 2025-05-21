import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { Patient } from 'src/domain/entities/patient';
import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';
export declare class UpdatePatientUseCase {
    private readonly repo;
    constructor(repo: PatientRepository);
    execute(cpf: UniqueEntityCpf, data: {
        name?: string;
        password?: string;
    }): Promise<Patient>;
}
