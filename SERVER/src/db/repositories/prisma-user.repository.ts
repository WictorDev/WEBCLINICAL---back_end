import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { PrismaService } from 'src/core/services/prisma.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/domain/entities/user';
import UniqueEntitycpf from 'src/core/entities/unique-entity-cpf';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 4);
  
    const createdUser = await this.prismaService.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        cpf: user.cpf,
        companyId: user.companyId,
        typeId: user.typeId,
        active: user.active,
      }
    })
  
    return new User(createdUser);
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
      companyId: user.companyId,
      typeId: user.typeId,
      active: user.active
    }
  })

  return new User(updatedUser);
}


  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => new User(user));
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique(email);
    return user? new User(user) : null;
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique(cpf)
    return user? new User(user) : null;

}


}
