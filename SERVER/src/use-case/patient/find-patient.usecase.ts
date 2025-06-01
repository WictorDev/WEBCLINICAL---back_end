import { Injectable } from '@nestjs/common';
import { PatientRepository } from 'src/domain/repositories/patient.repository';

@Injectable()
export class FindPatientUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute() {
    return this.patientRepository.findAll();
  }
} 