import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { Patient } from 'src/domain/entities/patient';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';
import * as bcrypt from 'bcrypt';

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
          typeId: patient.typeId,
          phoneNumber: patient.phoneNumber,
        },
      });
      return new Patient({
        cpf: new UniqueEntityCpf(created.cpf),
        name: created.name,
        email: created.email,
        password: created.password,
        typeId: created.typeId,
        phoneNumber: created.phoneNumber,
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
          typeId: patient.typeId,
          phoneNumber: patient.phoneNumber,
        }),
    );
  }

  async findByCpf(cpf: string): Promise<Patient | null> {
    const patient = await this.prismaService.patient.findUnique({
      where: { cpf },
    });
    if (!patient) return null;
    return new Patient({
      cpf: new UniqueEntityCpf(patient.cpf),
      name: patient.name,
      email: patient.email,
      password: patient.password,
      typeId: patient.typeId,
      phoneNumber: patient.phoneNumber,
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
      typeId: patient.typeId,
      phoneNumber: patient.phoneNumber,
    });
  }

  async update(cpf: string, data: Partial<Patient>): Promise<Patient> {
    const updated = await this.prismaService.patient.update({
      where: { cpf },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        typeId: data.typeId,
        phoneNumber: data.phoneNumber,
      },
    });
    return new Patient({
      cpf: new UniqueEntityCpf(updated.cpf),
      name: updated.name,
      email: updated.email,
      password: updated.password,
      typeId: updated.typeId,
      phoneNumber: updated.phoneNumber,
    });
  }

  async recoveryPassword(email: string, password: string): Promise<void> {
    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await this.prismaService.patient.update({
      where: { email },
      data: { password: hashedPassword },
    });
  }
} 