import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { Employee } from 'src/domain/entities/employee';
import { EmployeeRepository } from 'src/domain/repositories/employee.repository';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(employee: Employee): Promise<Employee> {
    console.log('PrismaEmployeeRepository - Criando employee:', employee);
    try {
      const created = await this.prismaService.employee.create({
        data: {
          cpf: employee.cpf,
          name: employee.name,
          advice: employee.advice === '' ? null : employee.advice,
          typeId: employee.typeId,
          employeeTypeId: employee.employeeTypeId || undefined,
        },
        include: {
          employeeType: true,
          type: true
        }
      });
      console.log('PrismaEmployeeRepository - Employee criado:', created);
      return new Employee({
        cpf: created.cpf,
        name: created.name,
        advice: created.advice ?? undefined,
        typeId: created.typeId,
        employeeTypeId: created.employeeTypeId || undefined,
      });
    } catch (error) {
      console.error('PrismaEmployeeRepository - Erro ao criar employee:', error);
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

  async findAll(): Promise<any[]> {
    console.log('PrismaEmployeeRepository - Buscando todos os employees');
    const employees = await this.prismaService.employee.findMany({
      include: {
        employeeType: true,
        type: true
      }
    });
    console.log('PrismaEmployeeRepository - Employees encontrados:', employees);
    return employees.map((employee) => ({
      cpf: employee.cpf,
      name: employee.name,
      advice: employee.advice ?? undefined,
      typeId: employee.typeId,
      employeeTypeId: employee.employeeTypeId || undefined,
      employeeType: employee.employeeType
        ? { id: employee.employeeType.id, name: employee.employeeType.name }
        : undefined,
    }));
  }

  async findByCpf(cpf: string): Promise<Employee | null> {
    console.log('PrismaEmployeeRepository - Buscando employee por CPF:', cpf);
    const employee = await this.prismaService.employee.findUnique({ 
      where: { cpf },
      include: {
        employeeType: true,
        type: true
      }
    });
    console.log('PrismaEmployeeRepository - Employee encontrado:', employee);
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
    console.log('PrismaEmployeeRepository - Atualizando employee:', { cpf, data });
    try {
      const updated = await this.prismaService.employee.update({
        where: { cpf },
        data: {
          name: data.name,
          advice: data.advice === '' ? null : data.advice,
          typeId: data.typeId,
          employeeTypeId: data.employeeTypeId,
        },
        include: {
          employeeType: true,
          type: true
        }
      });
      console.log('PrismaEmployeeRepository - Employee atualizado:', updated);
      return new Employee({
        cpf: updated.cpf,
        name: updated.name,
        advice: updated.advice ?? undefined,
        typeId: updated.typeId,
        employeeTypeId: updated.employeeTypeId || undefined,
      });
    } catch (error) {
      console.error('PrismaEmployeeRepository - Erro ao atualizar employee:', error);
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new ConflictException('Funcionário não encontrado.');
      }
      throw error;
    }
  }

  async delete(cpf: string): Promise<void> {
    console.log('PrismaEmployeeRepository - Deletando employee:', cpf);
    await this.prismaService.employee.delete({
      where: { cpf }
    });
    console.log('PrismaEmployeeRepository - Employee deletado com sucesso');
  }
} 