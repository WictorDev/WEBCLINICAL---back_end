import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { Employee } from 'src/domain/entities/employee';
import { EmployeeRepository } from 'src/domain/repositories/employee.repository';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(employee: Employee): Promise<Employee> {
    try {
      const created = await this.prismaService.employee.create({
        data: {
          cpf: employee.cpf,
          name: employee.name,
          advice: employee.advice,
          typeId: employee.typeId,
          employeeTypeId: employee.employeeTypeId || undefined,
        },
      });
      return new Employee({
        cpf: created.cpf,
        name: created.name,
        advice: created.advice ?? undefined,
        typeId: created.typeId,
        employeeTypeId: created.employeeTypeId || undefined,
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
          }
        } else if (typeof target === 'string') {
          if (target.includes('cpf')) {
            throw new ConflictException('CPF já cadastrado.');
          }
        }
        throw new ConflictException('CPF já cadastrado.');
      }
      throw error;
    }
  }

  async findAll(): Promise<Employee[]> {
    const employees = await this.prismaService.employee.findMany();
    return employees.map((employee) => new Employee({
      cpf: employee.cpf,
      name: employee.name,
      advice: employee.advice ?? undefined,
      typeId: employee.typeId,
      employeeTypeId: employee.employeeTypeId || undefined,
    }));
  }

  async findByCpf(cpf: string): Promise<Employee | null> {
    const employee = await this.prismaService.employee.findUnique({ where: { cpf } });
    if (!employee) return null;
    return new Employee({
      cpf: employee.cpf,
      name: employee.name,
      advice: employee.advice ?? undefined,
      typeId: employee.typeId,
      employeeTypeId: employee.employeeTypeId || undefined,
    });
  }

  async update(cpf: string, data: Partial<Employee>): Promise<Employee> {
    const updated = await this.prismaService.employee.update({
      where: { cpf },
      data: {
        name: data.name,
        advice: data.advice,
        typeId: data.typeId,
        employeeTypeId: data.employeeTypeId || undefined,
      },
    });
    return new Employee({
      cpf: updated.cpf,
      name: updated.name,
      advice: updated.advice ?? undefined,
      typeId: updated.typeId,
      employeeTypeId: updated.employeeTypeId || undefined,
    });
  }
} 