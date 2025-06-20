import { Injectable, NotFoundException } from '@nestjs/common';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { EmailService } from 'src/core/services/email.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RequestPasswordRecoveryUseCase {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string): Promise<void> {
    // Verificar se o paciente existe
    const patient = await this.patientRepository.findByEmail(email);
    if (!patient) {
      throw new NotFoundException('Email não encontrado em nossa base de dados');
    }

    // Gerar token JWT com o email e expiração de 1 hora
    const recoveryToken = this.jwtService.sign(
      { email, type: 'password-recovery' },
      { expiresIn: '1h' }
    );

    // Enviar email de recuperação
    await this.emailService.sendPasswordRecoveryEmail(email, recoveryToken);
  }
} 