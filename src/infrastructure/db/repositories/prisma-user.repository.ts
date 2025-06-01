import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { PrismaService } from 'src/core/services/prisma.service';
import { User } from 'src/domain/entities/user';
import UniqueEntityCpf from 'src/core/entities/unique-entity-cpf';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    try {
      // Primeiro, busca os tipos pelo nome
      const types = await Promise.all(
        user.types.map(async (typeName) => {
          const type = await this.prismaService.type.findUnique({
            where: { name: typeName }
          });
          if (!type) {
            throw new NotFoundException(`Tipo ${typeName} não encontrado.`);
          }
          return type;
        })
      );

      const createdUser = await this.prismaService.user.create({
        data: {
          cpf: user.cpf.toString(),
          name: user.name,
          email: user.email,
          password: user.password,
          companyId: user.companyId ?? null,
          active: user.active ?? true,
          types: {
            create: types.map(type => ({
              type: {
                connect: {
                  id: type.id
                }
              }
            }))
          }
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
        cpf: new UniqueEntityCpf(createdUser.cpf),
        name: createdUser.name,
        email: createdUser.email,
        password: createdUser.password,
        companyId: createdUser.companyId ?? undefined,
        types: createdUser.types.map(t => t.type.name),
        active: createdUser.active
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  async update(cpf: string, user: Partial<User>): Promise<User> {
    console.log('PrismaUserRepository - Atualizando usuário:', { cpf, user });
    
    // Se houver tipos para atualizar
    if (user.types) {
      // Primeiro, busca os tipos pelo nome
      const types = await Promise.all(
        user.types.map(async (typeName) => {
          const type = await this.prismaService.type.findUnique({
            where: { name: typeName }
          });
          if (!type) {
            throw new NotFoundException(`Tipo ${typeName} não encontrado.`);
          }
          return type;
        })
      );

      // Remove todos os tipos existentes
      await this.prismaService.userType.deleteMany({
        where: { userId: cpf }
      });

      // Cria os novos tipos
      await Promise.all(
        types.map(type => 
          this.prismaService.userType.create({
            data: {
              userId: cpf,
              typeId: type.id
            }
          })
        )
      );
    }

    // Atualiza os outros dados do usuário
    const updatedUser = await this.prismaService.user.update({
      where: { cpf },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        companyId: user.companyId,
        active: user.active
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
      cpf: new UniqueEntityCpf(updatedUser.cpf),
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      companyId: updatedUser.companyId || undefined,
      types: updatedUser.types.map(ut => ut.type.name),
      active: updatedUser.active
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      include: {
        types: true,
      },
    });
    return users.map((user) => new User({
      cpf: new UniqueEntityCpf(user.cpf),
      name: user.name,
      email: user.email,
      password: user.password,
      companyId: user.companyId ?? '',
      types: user.types.map(ut => ut.typeId),
      active: user.active,
    }));
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
      cpf: new UniqueEntityCpf(user.cpf),
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

  async delete(cpf: string): Promise<void> {
    await this.prismaService.user.delete({
      where: { cpf }
    });
  }

  async removeType(cpf: string, typeName: string): Promise<void> {
    // Primeiro busca o tipo pelo nome
    const type = await this.prismaService.type.findUnique({
      where: { name: typeName }
    });

    if (!type) {
      throw new NotFoundException(`Tipo ${typeName} não encontrado.`);
    }

    // Remove a relação UserType
    await this.prismaService.userType.deleteMany({
      where: {
        userId: cpf,
        typeId: type.id
      }
    });

    // Remove o registro específico baseado no tipo
    switch (typeName.toUpperCase()) {
      case 'ADMIN':
        await this.prismaService.admin.deleteMany({
          where: { cpf }
        });
        break;
      case 'EMPLOYEE':
        await this.prismaService.employee.deleteMany({
          where: { cpf }
        });
        break;
    }
  }
}
