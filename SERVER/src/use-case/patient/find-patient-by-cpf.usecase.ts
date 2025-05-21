import { Injectable } from '@nestjs/common';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { Patient } from 'src/domain/entities/patient';
import UniqueEntityCpf from 'src/core/entities/unique-entity-cpf';

@Injectable()
export class FindPatientByCpfUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(cpf: UniqueEntityCpf): Promise<Patient | null> {
    return this.patientRepository.findByCpf(cpf.toString());
  }
} 