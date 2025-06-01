import { PatientRepository } from 'src/domain/repositories/patient.repository';
export declare class FindPatientUseCase {
    private readonly patientRepository;
    constructor(patientRepository: PatientRepository);
    execute(): Promise<import("../../domain/entities/patient").Patient[]>;
}
