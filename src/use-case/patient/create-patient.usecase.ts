import { Injectable, BadRequestException } from '@nestjs/common';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { Patient } from 'src/domain/entities/patient';
import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { EmailService } from 'src/core/services/email.service';
import { JwtService } from '@nestjs/jwt';
import { PhoneFormatter } from 'src/core/utils/phone-formatter';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreatePatientUseCase {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly typeRepository: TypeRepository,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: { cpf: string; name: string; email: string; password: string; phoneNumber: string }) {
    // Verificar se o paciente já existe
    const existingPatient = await this.patientRepository.findByEmail(data.email);
    if (existingPatient) {
      throw new BadRequestException('Email já cadastrado.');
    }

    const existingPatientByCpf = await this.patientRepository.findByCpf(data.cpf);
    if (existingPatientByCpf) {
      throw new BadRequestException('CPF já cadastrado.');
    }

    // Buscar o tipo padrão "PATIENT"
    const type = await this.typeRepository.findByName('PATIENT');
    if (!type) {
      throw new BadRequestException('Tipo padrão PATIENT não encontrado.');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Formatar o número de telefone
    const formattedPhoneNumber = PhoneFormatter.format(data.phoneNumber);

    // Gerar token JWT com os dados do paciente e expiração de 24 horas
    const confirmationToken = this.jwtService.sign(
      {
        cpf: data.cpf,
        name: data.name,
        email: data.email,
        password: hashedPassword,
        typeId: type.id,
        phoneNumber: formattedPhoneNumber, // Usar o número formatado
        type: 'patient-confirmation'
      },
      { expiresIn: '24h' }
    );

    // Enviar email de confirmação
    await this.emailService.sendPatientConfirmationEmail(data.email, confirmationToken);

    return { message: 'Email de confirmação enviado. Verifique sua caixa de entrada para concluir o cadastro.' };
  }
} 