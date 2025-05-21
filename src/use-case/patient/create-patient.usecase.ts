import { Injectable, BadRequestException } from '@nestjs/common';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { Patient } from 'src/domain/entities/patient';
import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user';

@Injectable()
export class CreatePatientUseCase {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly typeRepository: TypeRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(data: { cpf: string; name: string; email: string; password: string; type: string }) {
    // Buscar o tipo pelo nome
    const type = await this.typeRepository.findByName(data.type);
    if (!type) {
      throw new BadRequestException(`Tipo ${data.type} não encontrado.`);
    }

    // Verificar se o usuário já existe
    const existingUser = await this.userRepository.findByCpf(data.cpf);
    
    if (existingUser) {
      // Se o usuário já existe, apenas adiciona o novo tipo
      await this.userRepository.addType(data.cpf, type.id);
    } else {
      // Se o usuário não existe, cria um novo
      const user = new User({
        name: data.name,
        cpf: new UniqueEntityCpf(data.cpf),
        email: data.email,
        password: data.password,
        types: [type.id],
        active: true
      });

      try {
        await this.userRepository.create(user);
      } catch (error) {
        // Se der erro de CPF duplicado, tenta apenas adicionar o tipo
        if (error.code === 'P2002' && error.meta?.target?.includes('cpf')) {
          await this.userRepository.addType(data.cpf, type.id);
        } else {
          throw error;
        }
      }
    }

    // Criar o paciente
    const patient = new Patient({
      cpf: new UniqueEntityCpf(data.cpf),
      name: data.name,
      email: data.email,
      password: data.password,
      typeId: type.id,
    });

    return this.patientRepository.create(patient);
  }
} 