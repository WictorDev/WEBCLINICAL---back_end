import { Injectable } from '@nestjs/common';
import { PatientRepository } from 'src/domain/repositories/patient.repository';

@Injectable()
export class FindPatientByEmailUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(email: string) {
    return this.patientRepository.findByEmail(email);
  }
} 