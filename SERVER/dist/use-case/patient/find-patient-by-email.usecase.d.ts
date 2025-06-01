import { PatientRepository } from 'src/domain/repositories/patient.repository';
export declare class FindPatientByEmailUseCase {
    private readonly patientRepository;
    constructor(patientRepository: PatientRepository);
    execute(email: string): Promise<import("../../domain/entities/patient").Patient | null>;
}
