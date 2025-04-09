import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { PrismaService } from 'src/core/services/prisma.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/domain/entities/user';
import UniqueEntityCpf from 'src/core/entities/unique-entity-cpf';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10); // força recomendada
  
    const createdUser = await this.prismaService.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        cpf: user.cpf.toString(),
        companyId: user.companyId ?? undefined,
        typeId: user.typeId ?? undefined,
        active: user.active ?? true,
      },
    });
  
    return new User({
      ...createdUser,
      cpf: new UniqueEntityCpf(createdUser.cpf),
      companyId: createdUser.companyId ?? undefined,
      typeId: createdUser.typeId ?? undefined,
    });
  }

  async update(
    cpf: string,
    user: Partial<Omit<User, 'cpf'>>,
  ): Promise<User> {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 4);
  }
  const updatedUser = await this.prismaService.user.update({
    where: { cpf: cpf.toString() },
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
      companyId: user.companyId ?? undefined,
      typeId: user.typeId ?? undefined,
      active: user.active ?? true
    }
  })

  return new User({
    ...updatedUser,
    cpf: new UniqueEntityCpf(updatedUser.cpf.toString()),
    companyId: updatedUser.companyId ?? undefined as string | undefined,
    typeId: updatedUser.typeId ?? undefined as string | undefined,
  });
}


async findAll(): Promise<User[]> {
  const users = await this.prismaService.user.findMany();

  return users.map((user) => {
    return new User({
      cpf: new UniqueEntityCpf(user.cpf.toString()),
      name: user.name,
      email: user.email,
      password: user.password,
      companyId: user.companyId ?? undefined,
      typeId: user.typeId ?? undefined,
      active: user.active,
    });
  });
}
async findByEmail(email: string): Promise<User | null> {
  const user = await this.prismaService.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  return new User({
    cpf: new UniqueEntityCpf(user.cpf.toString()),
    name: user.name,
    email: user.email,
    password: user.password,
    companyId: user.companyId ?? undefined,
    typeId: user.typeId ?? undefined,
    active: user.active,
    
  });
}

async findByCpf(cpf: string): Promise<User | null> {
  const user = await this.prismaService.user.findUnique({
    where: { cpf },
  });

  if (!user) return null;

  return new User({
    cpf: new UniqueEntityCpf(user.cpf.toString()),
    name: user.name,
    email: user.email,
    password: user.password,
    companyId: user.companyId ?? undefined,
    typeId: user.typeId ?? undefined,
    active: user.active,
    
  });


}}
