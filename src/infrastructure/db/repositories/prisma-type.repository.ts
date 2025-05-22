import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { Type } from 'src/domain/entities/type';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { TypeRepository } from 'src/domain/repositories/type.repository';

@Injectable()
export class PrismaTypeRepository implements TypeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(type: Type): Promise<Type> {
    try {
      const created = await this.prismaService.type.create({
        data: {
          name: type.name,
        },
      });
      return new Type({ id: created.id, name: created.name });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Tipo já cadastrado.');
      }
      throw error;
    }
  }

  async findAll(): Promise<Type[]> {
    const types = await this.prismaService.type.findMany();
    return types.map((type) => new Type({ id: type.id, name: type.name }));
  }

  async findById(id: string): Promise<Type | null> {
    if (!id) {
      throw new Error('ID do tipo não informado');
    }
    const type = await this.prismaService.type.findUnique({ where: { id } });
    if (!type) return null;
    return new Type({ id: type.id, name: type.name });
  }

  async findByName(name: string): Promise<Type | null> {
    const type = await this.prismaService.type.findFirst({ where: { name } });
    if (!type) return null;
    return new Type({ id: type.id, name: type.name });
  }
} 