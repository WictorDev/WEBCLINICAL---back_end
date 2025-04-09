import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { CreateUserUseCase } from 'src/use-case/user/create-user.usecase';
  import { UpdateUserUseCase } from 'src/use-case/user/update-user.usecase';
  import { FindUserByCpfUseCase } from 'src/use-case/user/findByCpf-user.usecase';
  import { FindUserByEmailUseCase } from 'src/use-case/user/findByEmail-user.usecase';
  import { FindUserUseCase } from 'src/use-case/user/find-user.usecase';
  import { JwtAuthGuard } from 'src/infrastructure/auth/jwt.guard';
  import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';
  
  @Controller('/api/users')
 /*@UseGuards(JwtAuthGuard)*/
  export class UserController {
    constructor(
      private readonly createUserUseCase: CreateUserUseCase,
      private readonly updateUserUseCase: UpdateUserUseCase,
      private readonly findUserByCpfUseCase: FindUserByCpfUseCase,
      private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
      private readonly findUserUseCase: FindUserUseCase
    ) {}
  
    @Get()
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
  
@Post('/create_user')
async create(
  @Body() body: { 
    name: string; 
    cpf: UniqueEntityCpf; 
    email: string; 
    password: string; 
    companyId?: string; 
    typeId?: string; 
    active: boolean; 
  }
) {
  return this.createUserUseCase.execute(body);
}
  
   
    @Put(':cpf')
    async update(@Param('cpf') cpf: string, @Body() body: any) {
      return this.updateUserUseCase.execute(new UniqueEntityCpf(cpf), body);
    }
  
    @Delete(':cpf')
    async delete(@Param('cpf') cpf: string) {
      return this.updateUserUseCase.execute(new UniqueEntityCpf(cpf), { active: false });
    }
  }