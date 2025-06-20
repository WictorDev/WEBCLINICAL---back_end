import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { Patient } from 'src/domain/entities/patient';
import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ConfirmPatientRegistrationUseCase {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(token: string): Promise<Patient> {
    try {
      // Verificar e decodificar o token
      const payload = this.jwtService.verify(token);
      
      // Verificar se é um token de confirmação de paciente
      if (payload.type !== 'patient-confirmation') {
        throw new UnauthorizedException('Token inválido');
      }

      // Verificar se o paciente já existe
      const existingPatient = await this.patientRepository.findByEmail(payload.email);
      if (existingPatient) {
        return existingPatient;
      }

      const existingPatientByCpf = await this.patientRepository.findByCpf(payload.cpf);
      if (existingPatientByCpf) {
        return existingPatientByCpf;
      }

      // Criar o paciente com os dados do token
      const patient = new Patient({
        cpf: new UniqueEntityCpf(payload.cpf),
        name: payload.name,
        email: payload.email,
        password: payload.password, // Já está hasheada no token
        typeId: payload.typeId,
        phoneNumber: payload.phoneNumber,
      });

      try {
        const createdPatient = await this.patientRepository.create(patient);
        return createdPatient;
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
          // Tentar buscar o paciente que pode ter sido criado por outra requisição
          const existingPatient = await this.patientRepository.findByEmail(payload.email);
          if (existingPatient) {
            return existingPatient;
          }
          
          const existingPatientByCpf = await this.patientRepository.findByCpf(payload.cpf);
          if (existingPatientByCpf) {
            return existingPatientByCpf;
          }
        }
        throw error;
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token inválido');
      }
      
      throw error;
    }
  }
} 