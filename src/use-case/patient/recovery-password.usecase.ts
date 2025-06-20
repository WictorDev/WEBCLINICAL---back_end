import { Injectable } from "@nestjs/common";
import { PatientRepository } from "src/domain/repositories/patient.repository";

@Injectable()
export class RecoveryPasswordUseCase {
    constructor(private readonly patientRepository: PatientRepository) { }

    async execute(email: string, password: string): Promise<void> {
        const patient = await this.patientRepository.findByEmail(email);
        if (!patient) throw new Error('Paciente não encontrado');
        await this.patientRepository.recoveryPassword(email, password);
    }
} 