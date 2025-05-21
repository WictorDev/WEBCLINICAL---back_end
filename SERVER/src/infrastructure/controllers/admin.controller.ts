import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateAdminUseCase } from 'src/use-case/admin/create-admin.usecase';
import { Admin } from 'src/domain/entities/admin';

@Controller('admins')
export class AdminController {
  constructor(
    private readonly createAdminUseCase: CreateAdminUseCase,
  ) {}

  @Post()
  async create(@Body() data: { cpf: string; name: string; type: string }) {
    return await this.createAdminUseCase.execute(data);
  }
} 