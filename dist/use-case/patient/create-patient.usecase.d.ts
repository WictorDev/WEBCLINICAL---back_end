import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { EmailService } from 'src/core/services/email.service';
import { JwtService } from '@nestjs/jwt';
export declare class CreatePatientUseCase {
    private readonly patientRepository;
    private readonly typeRepository;
    private readonly emailService;
    private readonly jwtService;
    constructor(patientRepository: PatientRepository, typeRepository: TypeRepository, emailService: EmailService, jwtService: JwtService);
    execute(data: {
        cpf: string;
        name: string;
        email: string;
        password: string;
        phoneNumber: string;
    }): Promise<{
        message: string;
    }>;
}
