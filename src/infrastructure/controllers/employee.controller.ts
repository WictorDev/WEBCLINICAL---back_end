import { Body, Controller, Get, Post, Put, Param, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEmployeeUseCase } from 'src/use-case/employee/create-employee.usecase';
import { UpdateEmployeeUseCase } from 'src/use-case/employee/update-employee.usecase';
import { PrismaEmployeeRepository } from '../db/repositories/prisma-employee.repository';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { EmployeeTypeRepository } from 'src/domain/repositories/employee-type.repository';

@ApiTags('employees')
@Controller('/api/employees')
export class EmployeeController {
  constructor(
    private readonly createUseCase: CreateEmployeeUseCase,
    private readonly updateUseCase: UpdateEmployeeUseCase,
    private readonly repo: PrismaEmployeeRepository,
    private readonly typeRepository: TypeRepository,
    private readonly employeeTypeRepository: EmployeeTypeRepository
  ) {}

  @Post()
  async create(@Body() body: { cpf: string; name: string; advice?: string; type: string; employeeType?: string }) {
    try {
      // Buscar o Type pelo nome
      const type = await this.typeRepository.findByName(body.type);
      if (!type) {
        throw new BadRequestException('Tipo não encontrado.');
      }

      let employeeTypeId: string | undefined;

      // Buscar o EmployeeType pelo nome apenas se foi fornecido
      if (body.employeeType) {
        const employeeType = await this.employeeTypeRepository.findByName(body.employeeType);
        if (!employeeType) {
          throw new BadRequestException('Tipo de funcionário não encontrado.');
        }
        employeeTypeId = employeeType.id;
      }
      
      return await this.createUseCase.execute({
        cpf: body.cpf,
        name: body.name,
        advice: body.advice,
        type: body.type,
        employeeTypeId
      });
    } catch (error) {
      if (error.message && error.message.includes('CPF')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Get()
  async findAll() {
    return this.repo.findAll();
  }

  @Put(':cpf')
  async update(@Param('cpf') cpf: string, @Body() body: Partial<{ name: string; advice?: string; type?: string; employeeType?: string }>) {
    try {
      const updatedData: any = {
        name: body.name,
        advice: body.advice
      };

      // Se o tipo for enviado, buscar o ID
      if (body.type) {
        const type = await this.typeRepository.findByName(body.type);
        if (!type) {
          throw new BadRequestException('Tipo não encontrado.');
        }
        updatedData.typeId = type.id;
      }

      // Se o tipo de funcionário for enviado, buscar o ID
      if (body.employeeType) {
        const employeeType = await this.employeeTypeRepository.findByName(body.employeeType);
        if (!employeeType) {
          throw new BadRequestException('Tipo de funcionário não encontrado.');
        }
        updatedData.employeeTypeId = employeeType.id;
      }

      return this.updateUseCase.execute(cpf, updatedData);
    } catch (error) {
      throw error;
    }
  }
} 