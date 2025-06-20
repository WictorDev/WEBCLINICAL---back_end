import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { EmailService } from 'src/core/services/email.service';
import { JwtService } from '@nestjs/jwt';
export declare class RequestPasswordRecoveryUseCase {
    private readonly patientRepository;
    private readonly emailService;
    private readonly jwtService;
    constructor(patientRepository: PatientRepository, emailService: EmailService, jwtService: JwtService);
    execute(email: string): Promise<void>;
}
