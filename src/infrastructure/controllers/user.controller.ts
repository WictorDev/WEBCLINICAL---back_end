import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UseGuards,
  BadRequestException
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/use-case/user/create-user.usecase';
import { UpdateUserUseCase } from 'src/use-case/user/update-user.usecase';
import { FindUserByCpfUseCase } from 'src/use-case/user/findByCpf-user.usecase';
import { FindUserByEmailUseCase } from 'src/use-case/user/findByEmail-user.usecase';
import { FindUserUseCase } from 'src/use-case/user/find-user.usecase';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt.guard';
import { Roles } from 'src/infrastructure/auth/roles.decorator';
import { RolesGuard } from 'src/infrastructure/auth/roles.guard';
import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';
import { ApiTags } from '@nestjs/swagger';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { CreateFirstAdminUseCase } from 'src/use-case/user/create-first-admin.usecase';
import { Public } from 'src/infrastructure/auth/public.decorator';
@ApiTags('users')
@Controller('/api/users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findUserByCpfUseCase: FindUserByCpfUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly typeRepository: TypeRepository,
    private readonly createFirstAdminUseCase: CreateFirstAdminUseCase
  ) {}

  @Get()
  @Roles('Admin')
  async findAll() {
    return this.findUserUseCase.execute();
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.findUserByEmailUseCase.execute(email);
  }

  @Get('cpf/:cpf')
  async findByCpf(@Param('cpf') cpf: string) {
    return this.findUserByCpfUseCase.execute(new UniqueEntityCpf(cpf));
  }

  @Post('create_user')
  async createUser(@Body() body: {
    name: string;
    cpf: string;
    email: string;
    password: string;
    types: string[];
    companyId: string;
    active?: boolean;
    employeeTypeId?: string;
    advice?: string;
  }) {
    return this.createUserUseCase.execute({
      name: body.name,
      cpf: body.cpf,
      email: body.email,
      password: body.password,
      types: body.types,
      companyId: body.companyId,
      active: body.active,
      employeeTypeId: body.employeeTypeId,
      advice: body.advice
    });
  }

  @Public()
  @Post('/create_first_admin')
  async createFirstUser(@Body() body: { name: string; cpf: string; email: string; password: string; companyId: string; active: boolean }) {
    const users = await this.findUserUseCase.execute();
    if (users && users.length > 0) {
      throw new BadRequestException('Já existe um usuário cadastrado.');
    }
    try {
      return this.createFirstAdminUseCase.execute(body);
    } catch (error) {
      if (error.message && error.message.includes('CPF')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Put('cpf/:cpf')
  async update(@Param('cpf') cpf: string, @Body() body: any) {
    console.log('UserController - Atualizando usuário:', { cpf, body });
    try {
      const result = await this.updateUserUseCase.execute(new UniqueEntityCpf(cpf), body);
      console.log('UserController - Usuário atualizado com sucesso:', result);
      return result;
    } catch (error) {
      console.error('UserController - Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  @Delete('cpf/:cpf')
  async delete(@Param('cpf') cpf: string) {
    return this.updateUserUseCase.execute(new UniqueEntityCpf(cpf), { active: false });
  }
} 