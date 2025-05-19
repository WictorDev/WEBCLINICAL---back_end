import { Body, Controller, Get, Post, BadRequestException, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEmployeeTypeUseCase } from 'src/use-case/employee/create-employee-type.usecase';
import { FindAllEmployeeTypeUseCase } from 'src/use-case/employee/find-all-employee-type.usecase';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Public } from '../auth/public.decorator';

@ApiTags('employee-types')
@UseGuards(JwtAuthGuard)
@Public()
@Controller('/api/employee-types')
export class EmployeeTypeController {
  constructor(
    private readonly createEmployeeTypeUseCase: CreateEmployeeTypeUseCase,
    private readonly findAllEmployeeTypeUseCase: FindAllEmployeeTypeUseCase
  ) {}

  @Post()
  async create(@Body() body: { name: string }) {
    try {
      return await this.createEmployeeTypeUseCase.execute(body);
    } catch (error) {
      if (error.message && error.message.includes('Tipo')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Get()
  async findAll() {
    return this.findAllEmployeeTypeUseCase.execute();
  }
} 