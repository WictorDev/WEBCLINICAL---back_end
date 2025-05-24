import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateEmployeeTypeUseCase } from 'src/use-case/employee-type/create-employee-type.usecase';
import { FindAllEmployeeTypesUseCase } from 'src/use-case/employee-type/find-all-employee-types.usecase';
import { FindEmployeeTypeByIdUseCase } from 'src/use-case/employee-type/find-employee-type-by-id.usecase';
import { FindEmployeeTypeByNameUseCase } from 'src/use-case/employee-type/find-employee-type-by-name.usecase';

@ApiTags('employee-types')
@Controller('api/employee-types')
export class EmployeeTypeController {
  constructor(
    private readonly createUseCase: CreateEmployeeTypeUseCase,
    private readonly findAllUseCase: FindAllEmployeeTypesUseCase,
    private readonly findByIdUseCase: FindEmployeeTypeByIdUseCase,
    private readonly findByNameUseCase: FindEmployeeTypeByNameUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo tipo de funcionário' })
  @ApiBody({
    schema: {
      example: {
        name: 'PSICÓLOGO'
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Tipo criado' })
  async create(@Body() body: { name: string }) {
    return this.createUseCase.execute(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os tipos de funcionário' })
  @ApiResponse({ status: 200, description: 'Lista de tipos' })
  async findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tipo de funcionário por ID' })
  @ApiParam({ name: 'id', description: 'ID do tipo de funcionário' })
  @ApiResponse({ status: 200, description: 'Tipo encontrado' })
  @ApiResponse({ status: 404, description: 'Tipo não encontrado' })
  async findById(@Param('id') id: string) {
    return this.findByIdUseCase.execute(id);
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Buscar tipo de funcionário por nome' })
  @ApiParam({ name: 'name', description: 'Nome do tipo de funcionário' })
  @ApiResponse({ status: 200, description: 'Tipo encontrado' })
  @ApiResponse({ status: 404, description: 'Tipo não encontrado' })
  async findByName(@Param('name') name: string) {
    return this.findByNameUseCase.execute(name);
  }
} 