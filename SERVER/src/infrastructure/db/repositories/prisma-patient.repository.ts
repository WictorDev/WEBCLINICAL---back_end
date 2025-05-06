import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { Patient } from 'src/domain/entities/patient';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';

@Injectable()
export class PrismaPatientRepository implements PatientRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(patient: Patient): Promise<Patient> {
    try {
      const created = await this.prismaService.patient.create({
        data: {
          cpf: patient.cpf.toString(),
          name: patient.name,
          email: patient.email,
          password: patient.password,
          typeId: patient.type,
        },
      });
      return new Patient({
        cpf: new UniqueEntityCpf(created.cpf),
        name: created.name,
        email: created.email,
        password: created.password,
        type: created.typeId,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const target = error.meta?.target;
        if (Array.isArray(target)) {
          if (target.includes('cpf')) {
            throw new ConflictException('CPF já cadastrado.');
          } else if (target.includes('email')) {
            throw new ConflictException('Email já cadastrado.');
          }
        } else if (typeof target === 'string') {
          if (target.includes('cpf')) {
            throw new ConflictException('CPF já cadastrado.');
          } else if (target.includes('email')) {
            throw new ConflictException('Email já cadastrado.');
          }
        }
        throw new ConflictException('Registro duplicado.');
      }
      throw error;
    }
  }

  async findAll(): Promise<Patient[]> {
    const patients = await this.prismaService.patient.findMany();
    return patients.map(
      (patient) =>
        new Patient({
          cpf: new UniqueEntityCpf(patient.cpf),
          name: patient.name,
          email: patient.email,
          password: patient.password,
          type: patient.typeId,
        }),
    );
  }

  async findByCpf(cpf: UniqueEntityCpf): Promise<Patient | null> {
    const patient = await this.prismaService.patient.findUnique({
      where: { cpf: cpf.toString() },
    });
    if (!patient) return null;
    return new Patient({
      cpf: new UniqueEntityCpf(patient.cpf),
      name: patient.name,
      email: patient.email,
      password: patient.password,
      type: patient.typeId,
    });
  }

  async findByEmail(email: string): Promise<Patient | null> {
    const patient = await this.prismaService.patient.findUnique({
      where: { email },
    });
    if (!patient) return null;
    return new Patient({
      cpf: new UniqueEntityCpf(patient.cpf),
      name: patient.name,
      email: patient.email,
      password: patient.password,
      type: patient.typeId,
    });
  }

  async update(cpf: UniqueEntityCpf, data: Partial<Patient>): Promise<Patient> {
    const updated = await this.prismaService.patient.update({
      where: { cpf: cpf.toString() },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        typeId: data.type,
      },
    });
    return new Patient({
      cpf: new UniqueEntityCpf(updated.cpf),
      name: updated.name,
      email: updated.email,
      password: updated.password,
      type: updated.typeId,
    });
  }
} 