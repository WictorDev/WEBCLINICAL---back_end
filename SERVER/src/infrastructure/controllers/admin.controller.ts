import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateAdminUseCase } from 'src/use-case/admin/create-admin.usecase';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt.guard';

@Controller('admins')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(
    private readonly createAdminUseCase: CreateAdminUseCase,
  ) {}

  @Post()
  async create(@Body() data: { cpf: string; name: string; type: string }) {
    return await this.createAdminUseCase.execute(data);
  }
} 