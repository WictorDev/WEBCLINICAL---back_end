import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { AdminRepository } from 'src/domain/repositories/admin.repository';
import { Admin } from 'src/domain/entities/admin';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import UniqueEntityCpf from "src/core/entities/unique-entity-cpf";

@Injectable()
export class PrismaAdminRepository implements AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Admin): Promise<Admin> {
    try {
      // Usa o ID do tipo recebido
      const admin = await this.prisma.admin.create({
        data: {
          cpf: data.cpf.toString(),
          name: data.name,
          typeId: data.type // Aqui data.type é o ID
        },
        include: {
          type: true
        }
      });

      return new Admin({
        cpf: new UniqueEntityCpf(admin.cpf),
        name: admin.name,
        type: admin.type.name
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('CPF já cadastrado.');
      }
      throw error;
    }
  }

  async update(cpf: string, data: Partial<Admin>): Promise<Admin> {
    try {
      const admin = await this.prisma.admin.update({
        where: { cpf },
        data: {
          name: data.name
        },
        include: {
          type: true
        }
      });

      return new Admin({
        cpf: new UniqueEntityCpf(admin.cpf),
        name: admin.name,
        type: admin.type.name
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new ConflictException('Admin não encontrado.');
      }
      throw error;
    }
  }

  async findByCpf(cpf: string): Promise<Admin | null> {
    const admin = await this.prisma.admin.findUnique({
      where: { cpf },
      include: {
        type: true
      }
    });

    if (!admin) return null;

    return new Admin({
      cpf: new UniqueEntityCpf(admin.cpf),
      name: admin.name,
      type: admin.type.name
    });
  }

  async findAll(): Promise<Admin[]> {
    const admins = await this.prisma.admin.findMany({
      include: {
        type: true
      }
    });

    return admins.map(admin => new Admin({
      cpf: new UniqueEntityCpf(admin.cpf),
      name: admin.name,
      type: admin.type.name
    }));
  }

  async delete(cpf: string): Promise<void> {
    await this.prisma.admin.delete({
      where: { cpf }
    });
  }
} 