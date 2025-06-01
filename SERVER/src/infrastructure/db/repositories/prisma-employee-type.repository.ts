import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { EmployeeType } from 'src/domain/entities/employee-type';
import { EmployeeTypeRepository } from 'src/domain/repositories/employee-type.repository';

@Injectable()
export class PrismaEmployeeTypeRepository implements EmployeeTypeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(employeeType: EmployeeType): Promise<EmployeeType> {
    const created = await this.prismaService.employeeType.create({
      data: {
        name: employeeType.name,
      },
    });
    return new EmployeeType({
      id: created.id,
      name: created.name,
    });
  }

  async findAll(): Promise<EmployeeType[]> {
    const employeeTypes = await this.prismaService.employeeType.findMany();
    return employeeTypes.map(
      (employeeType) =>
        new EmployeeType({
          id: employeeType.id,
          name: employeeType.name,
        }),
    );
  }

  async findById(id: string): Promise<EmployeeType | null> {
    const employeeType = await this.prismaService.employeeType.findUnique({
      where: { id },
    });
    if (!employeeType) return null;
    return new EmployeeType({
      id: employeeType.id,
      name: employeeType.name,
    });
  }

  async findByName(name: string): Promise<EmployeeType | null> {
    const employeeType = await this.prismaService.employeeType.findFirst({
      where: { name },
    });
    if (!employeeType) return null;
    return new EmployeeType({
      id: employeeType.id,
      name: employeeType.name,
    });
  }
} 