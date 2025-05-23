import { Injectable, BadRequestException } from '@nestjs/common';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { Patient } from 'src/domain/entities/patient';
import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreatePatientUseCase {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly typeRepository: TypeRepository
  ) {}

  async execute(data: { cpf: string; name: string; email: string; password: string }) {
    // Buscar o tipo padrão "PATIENT"
    const type = await this.typeRepository.findByName('PATIENT');
    if (!type) {
      throw new BadRequestException('Tipo padrão PATIENT não encontrado.');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Criar o paciente
    const patient = new Patient({
      cpf: new UniqueEntityCpf(data.cpf),
      name: data.name,
      email: data.email,
      password: hashedPassword,
      typeId: type.id,
    });

    return this.patientRepository.create(patient);
  }
} 