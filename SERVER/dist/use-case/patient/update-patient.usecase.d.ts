import { PatientRepository } from "src/domain/repositories/patient.repository";
import { Patient } from "src/domain/entities/patient";
import UniqueEntityCpf from "src/core/entities/unique-entity-cpf";
export declare class UpdatePatientUseCase {
    private readonly patientRepository;
    constructor(patientRepository: PatientRepository);
    execute(cpf: UniqueEntityCpf, data: Partial<Patient>): Promise<Patient>;
}
