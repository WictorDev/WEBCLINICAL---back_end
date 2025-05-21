import { Injectable } from '@nestjs/common';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { Patient } from 'src/domain/entities/patient';
import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdatePatientUseCase {
  constructor(private readonly repo: PatientRepository) {}

  async execute(cpf: UniqueEntityCpf, data: { name?: string; password?: string }) {
    const patient = await this.repo.findByCpf(cpf);
    if (!patient) {
      throw new Error('Paciente não encontrado.');
    }

    const updateData: Partial<Patient> = {};

    if (data.name) {
      updateData.name = data.name;
    }

    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateData.password = hashedPassword;
    }

    return this.repo.update(cpf, updateData);
  }
} 