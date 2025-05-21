import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { Patient } from 'src/domain/entities/patient';
import UniqueEntityCpf from 'src/core/entities/unique-entity-cpf';
export declare class FindPatientByCpfUseCase {
    private readonly patientRepository;
    constructor(patientRepository: PatientRepository);
    execute(cpf: UniqueEntityCpf): Promise<Patient | null>;
}
