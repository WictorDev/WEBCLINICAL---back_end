import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTypeUseCase } from 'src/use-case/type/create-type.usecase';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { Public } from 'src/infrastructure/auth/public.decorator';
import { Type } from 'src/domain/entities/type';

@ApiTags('types')
@Controller('/api/types')
export class TypeController {
  constructor(
    private readonly createTypeUseCase: CreateTypeUseCase,
    private readonly typeRepository: TypeRepository
  ) {}

  @Post()
  async create(@Body() body: { name: string }) {
    try {
      return await this.createTypeUseCase.execute(body);
    } catch (error) {
      if (error.message && error.message.includes('Tipo')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Public()
  @Post('/create_initial_types')
  async createInitialTypes() {
    const types = await this.typeRepository.findAll();
    if (types && types.length > 0) {
      throw new BadRequestException('Já existem tipos cadastrados.');
    }
    const initialTypes = [
      { name: 'ADMIN' },
      { name: 'EMPLOYEE' },
      { name: 'PATIENT' }
    ];
    const createdTypes: Type[] = [];
    for (const type of initialTypes) {
      try {
        const created = await this.createTypeUseCase.execute(type);
        createdTypes.push(created);
      } catch (error) {
        throw new BadRequestException(`Erro ao criar tipo ${type.name}: ${error.message}`);
      }
    }
    return createdTypes;
  }
} 