import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { PrismaService } from 'src/core/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/domain/entities/user';
import UniqueEntityCpf from 'src/core/entities/unique-entity-cpf';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    // Hash da senha se ainda não estiver hasheada
    let password = user.password;
    if (!password.startsWith('$2b$')) {
      password = await bcrypt.hash(user.password, 10);
    }

    try {
      const createdUser = await this.prismaService.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: password,
          cpf: user.cpf.toString(),
          companyId: user.companyId,
          types: {
            create: user.types.map(typeId => ({
              type: {
                connect: { id: typeId }
              }
            }))
          },
          active: user.active ?? true,
        },
        include: {
          types: {
            include: {
              type: true
            }
          }
        }
      });

      return new User({
        ...createdUser,
        cpf: new UniqueEntityCpf(createdUser.cpf),
        companyId: createdUser.companyId ?? '',
        types: createdUser.types.map(ut => ut.type.id),
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const target = error.meta?.target;
        if (Array.isArray(target)) {
          if (target.includes('email')) {
            throw new ConflictException('E-mail já cadastrado.');
          }
          if (target.includes('cpf')) {
            throw new ConflictException('CPF já cadastrado.');
          }
        } else if (typeof target === 'string') {
          if (target.includes('email')) {
            throw new ConflictException('E-mail já cadastrado.');
          }
          if (target.includes('cpf')) {
            throw new ConflictException('CPF já cadastrado.');
          }
        }
        throw new ConflictException('E-mail ou CPF já cadastrado.');
      }
      throw error;
    }
  }

  async update(
    cpf: string,
    user: Partial<Omit<User, 'cpf'>>,
  ): Promise<User> {
    let password = user.password;
    if (password && !password.startsWith('$2b$')) {
      password = await bcrypt.hash(password, 10);
    }

    const updateData: any = {
        name: user.name,
        email: user.email,
        password: password,
        companyId: user.companyId,
        active: user.active ?? true
    };

    // Se houver tipos para atualizar
    if (user.types) {
      updateData.types = {
        deleteMany: {}, // Remove todos os tipos existentes
        create: user.types.map(typeId => ({
          type: {
            connect: { id: typeId }
          }
        }))
      };
    }

    const updatedUser = await this.prismaService.user.update({
      where: { cpf: cpf.toString() },
      data: updateData,
      include: {
        types: {
          include: {
            type: true
          }
        }
      }
    });

    return new User({
      ...updatedUser,
      cpf: new UniqueEntityCpf(updatedUser.cpf.toString()),
      companyId: updatedUser.companyId ?? '',
      types: updatedUser.types.map(ut => ut.type.id),
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      include: {
        types: {
          include: {
            type: true
          }
        }
      }
    });

    return users.map((user) => {
      return new User({
        cpf: new UniqueEntityCpf(user.cpf),
        name: user.name,
        email: user.email,
        password: user.password,
        companyId: user.companyId ?? '',
        types: user.types.map(ut => ut.type.id),
        active: user.active,
      });
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: {
        types: {
          include: {
            type: true
          }
        }
      }
    });

    if (!user) {
      return null;
    }

    return new User({
      cpf: new UniqueEntityCpf(user.cpf.toString()),
      name: user.name,
      email: user.email,
      password: user.password,
      companyId: user.companyId ?? '',
      types: user.types.map(ut => ut.type.id),
      active: user.active,
    });
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { cpf },
      include: {
        types: {
          include: {
            type: true
          }
        }
      }
    });

    if (!user) return null;

    return new User({
      cpf: new UniqueEntityCpf(user.cpf.toString()),
      name: user.name,
      email: user.email,
      password: user.password,
      companyId: user.companyId ?? '',
      types: user.types.map(ut => ut.type.id),
      active: user.active,
    });
  }

  async addType(cpf: string, typeId: string): Promise<void> {
    // Primeiro verifica se o usuário existe
    const user = await this.prismaService.user.findUnique({
      where: { cpf }
    });

    if (!user) {
      throw new NotFoundException(`Usuário com CPF ${cpf} não encontrado.`);
    }

    // Verifica se o tipo já existe para este usuário
    const existingType = await this.prismaService.userType.findFirst({
      where: {
        user: {
          cpf: cpf
        },
        typeId: typeId
      }
    });

    if (existingType) {
      return; // Se o tipo já existe, não faz nada
    }

    // Adiciona o novo tipo
    await this.prismaService.userType.create({
      data: {
        user: {
          connect: { cpf }
        },
        type: {
          connect: { id: typeId }
        }
      }
    });
  }
}
