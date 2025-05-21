import { Body, Controller, Get, Post, BadRequestException, UseGuards, Logger, InternalServerErrorException } from '@nestjs/common';
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
  private readonly logger = new Logger(EmployeeTypeController.name);

  constructor(
    private readonly createEmployeeTypeUseCase: CreateEmployeeTypeUseCase,
    private readonly findAllEmployeeTypeUseCase: FindAllEmployeeTypeUseCase
  ) {}

  @Post()
  async create(@Body() body: { name: string }) {
    try {
      const result = await this.createEmployeeTypeUseCase.execute(body);
      return result;
    } catch (error) {
      this.logger.error(`Erro ao criar tipo de funcionário: ${error.message}`);
      if (error.message && error.message.includes('Tipo')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      // Buscar os dados do repositório
      const result = await this.findAllEmployeeTypeUseCase.execute();
      
      // Verificar se o resultado é válido
      if (!result) {
        return [];
      }
      
      // Log da estrutura exata que está sendo retornada
      const serializedResult = Array.isArray(result) 
        ? result.map(item => ({
            id: item.id,
            name: item.name
          }))
        : [];
      
      // Retornar os dados normalizados
      return serializedResult;
    } catch (error) {
      this.logger.error(`Erro ao buscar tipos de funcionário: ${error.message}`);
      throw new InternalServerErrorException('Erro ao buscar tipos de funcionário');
    }
  }
} 