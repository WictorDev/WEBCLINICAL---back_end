import { Body, Controller, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { CreateAdminUseCase } from 'src/use-case/admin/create-admin.usecase';
import { DeleteAdminUseCase } from 'src/use-case/admin/delete-admin.usecase';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt.guard';

@Controller('/api/admins')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(
    private readonly createAdminUseCase: CreateAdminUseCase,
    private readonly deleteAdminUseCase: DeleteAdminUseCase,
  ) {}

  @Post()
  async create(@Body() data: { cpf: string; name: string; type: string }) {
    return await this.createAdminUseCase.execute(data);
  }

  @Delete(':cpf')
  async delete(@Param('cpf') cpf: string) {
    await this.deleteAdminUseCase.execute(cpf);
    return { message: 'Admin removido com sucesso' };
  }
} 