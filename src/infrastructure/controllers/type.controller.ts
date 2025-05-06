import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTypeUseCase } from 'src/use-case/type/create-type.usecase';

@ApiTags('types')
@Controller('/api/types')
export class TypeController {
  constructor(private readonly createTypeUseCase: CreateTypeUseCase) {}

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
} 