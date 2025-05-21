import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { PrismaService } from 'src/core/services/prisma.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/domain/entities/user';
import UniqueEntityCpf from 'src/core/entities/unique-entity-cpf';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10); // força recomendada
    try {
      const createdUser = await this.prismaService.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          cpf: user.cpf.toString(),
          companyId: user.companyId,
          typeId: user.type,
          active: user.active ?? true,
        },
      });

      // Verificar se o usuário criado é do tipo Admin ou Employee
      const userType = await this.prismaService.type.findUnique({
        where: { id: user.type }
      });

      // Se o tipo for "Admin", criar registro na tabela Admin também
      if (userType && userType.name === 'Admin') {
        try {
          // Verifica se já existe um Admin com este CPF
          const existingAdmin = await this.prismaService.admin.findUnique({
            where: { Cpf: user.cpf.toString() }
          });

          // Se não existir, cria o registro de Admin
          if (!existingAdmin) {
            await this.prismaService.admin.create({
              data: {
                Cpf: user.cpf.toString(),
                name: user.name,
                typeId: user.type
              }
            });
            console.log(`Registro de Admin criado automaticamente para o usuário ${user.name} (CPF: ${user.cpf.toString()})`);
          }
        } catch (adminError) {
          console.error('Erro ao criar registro de Admin:', adminError);
          // Não falhar a operação principal se o registro de Admin falhar
        }
      }
      
      // Se o tipo for "Employee", criar registro na tabela Employee também
      else if (userType && userType.name === 'Employee') {
        try {
          // Verifica se já existe um Employee com este CPF
          const existingEmployee = await this.prismaService.employee.findUnique({
            where: { cpf: user.cpf.toString() }
          });

          // Se não existir, cria o registro de Employee
          if (!existingEmployee) {
            // Buscar um tipo de funcionário padrão (pode ser personalizado conforme necessário)
            const defaultEmployeeType = await this.prismaService.employeeType.findFirst();
            
            if (!defaultEmployeeType) {
              console.error('Não foi possível encontrar um EmployeeType padrão para o funcionário');
              throw new Error('EmployeeType não encontrado');
            }
            
            await this.prismaService.employee.create({
              data: {
                cpf: user.cpf.toString(),
                name: user.name,
                typeId: user.type,
                employeeTypeId: defaultEmployeeType.id
              }
            });
            console.log(`Registro de Employee criado automaticamente para o usuário ${user.name} (CPF: ${user.cpf.toString()})`);
          }
        } catch (employeeError) {
          console.error('Erro ao criar registro de Employee:', employeeError);
          // Não falhar a operação principal se o registro de Employee falhar
        }
      }

      return new User({
        ...createdUser,
        cpf: new UniqueEntityCpf(createdUser.cpf),
        companyId: createdUser.companyId ?? '',
        type: createdUser.typeId ?? '',
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // Pode ser array ou string, dependendo do banco/versão do Prisma
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
      typeId: user.type,
      active: user.active ?? true
    }
  });

  // Se o tipo estiver sendo atualizado, verificar e criar registro correspondente
  if (user.type) {
    const userType = await this.prismaService.type.findUnique({
      where: { id: user.type }
    });

    // Caso o tipo seja Admin
    if (userType && userType.name === 'Admin') {
      try {
        // Verifica se já existe um Admin com este CPF
        const existingAdmin = await this.prismaService.admin.findUnique({
          where: { Cpf: cpf.toString() }
        });

        // Se não existir, cria o registro de Admin
        if (!existingAdmin) {
          await this.prismaService.admin.create({
            data: {
              Cpf: cpf.toString(),
              name: updatedUser.name,
              typeId: user.type
            }
          });
          console.log(`Registro de Admin criado automaticamente para o usuário ${updatedUser.name} (CPF: ${cpf})`);
        }
      } catch (adminError) {
        console.error('Erro ao criar registro de Admin durante atualização:', adminError);
        // Não falhar a operação principal se o registro de Admin falhar
      }
    }
    
    // Caso o tipo seja Employee
    else if (userType && userType.name === 'Employee') {
      try {
        // Verifica se já existe um Employee com este CPF
        const existingEmployee = await this.prismaService.employee.findUnique({
          where: { cpf: cpf.toString() }
        });

        // Se não existir, cria o registro de Employee
        if (!existingEmployee) {
          // Buscar um tipo de funcionário padrão
          const defaultEmployeeType = await this.prismaService.employeeType.findFirst();
          
          if (!defaultEmployeeType) {
            console.error('Não foi possível encontrar um EmployeeType padrão para o funcionário');
            throw new Error('EmployeeType não encontrado');
          }
          
          await this.prismaService.employee.create({
            data: {
              cpf: cpf.toString(),
              name: updatedUser.name,
              typeId: user.type,
              employeeTypeId: defaultEmployeeType.id
            }
          });
          console.log(`Registro de Employee criado automaticamente para o usuário ${updatedUser.name} (CPF: ${cpf})`);
        }
      } catch (employeeError) {
        console.error('Erro ao criar registro de Employee durante atualização:', employeeError);
        // Não falhar a operação principal se o registro de Employee falhar
      }
    }
  }

  return new User({
    ...updatedUser,
    cpf: new UniqueEntityCpf(updatedUser.cpf.toString()),
    companyId: updatedUser.companyId ?? '',
    type: updatedUser.typeId ?? '',
  });
}


async findAll(): Promise<User[]> {
  const users = await this.prismaService.user.findMany();

  return users.map((user) => {
    return new User({
      cpf: new UniqueEntityCpf(user.cpf),
      name: user.name,
      email: user.email,
      password: user.password,
      companyId: user.companyId ?? '',
      type: user.typeId ?? '',
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
    companyId: user.companyId ?? '',
    type: user.typeId ?? '',
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
    companyId: user.companyId ?? '',
    type: user.typeId ?? '',
    active: user.active,
    
  });


}}
