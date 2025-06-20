import { PatientRepository } from "src/domain/repositories/patient.repository";
export declare class RecoveryPasswordUseCase {
    private readonly patientRepository;
    constructor(patientRepository: PatientRepository);
    execute(email: string, password: string): Promise<void>;
}
