import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { Patient } from 'src/domain/entities/patient';
import { JwtService } from '@nestjs/jwt';
export declare class ConfirmPatientRegistrationUseCase {
    private readonly patientRepository;
    private readonly jwtService;
    constructor(patientRepository: PatientRepository, jwtService: JwtService);
    execute(token: string): Promise<Patient>;
}
