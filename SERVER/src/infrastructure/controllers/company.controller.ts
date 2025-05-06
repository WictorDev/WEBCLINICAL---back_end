import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    BadRequestException,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
  import { JwtAuthGuard } from 'src/infrastructure/auth/jwt.guard';
  import { CreateCompanyUseCase } from 'src/use-case/company/create-company.usecase';
  import { UpdateCompanyUseCase } from 'src/use-case/company/update-company.usecase';  
  import { FindCompanyByEmailUseCase } from 'src/use-case/company/findByEmail.usecase';
  import { FindCompanyByCnpjUseCase } from 'src/use-case/company/findByCnpj-company.usecase';
  import { FindCompanyUseCase } from 'src/use-case/company/find-company.usecase';
  import { UniqueEntityCnpj } from 'src/core/entities/unique-entity-cnpj';
  import { Public } from 'src/infrastructure/auth/public.decorator';
  @ApiTags('companies')
  @Controller('/api/companies')
  @UseGuards(JwtAuthGuard)
  export class CompanyController {
    constructor(
      private readonly createCompanyUseCase: CreateCompanyUseCase,
      private readonly updateCompanyUseCase: UpdateCompanyUseCase,
      private readonly findCompanyByEmailUseCase: FindCompanyByEmailUseCase,
      private readonly findCompanyByCnpjUseCase: FindCompanyByCnpjUseCase,
      private readonly findCompanyUseCase: FindCompanyUseCase
    ) {}
  
    @Get()
    async findAll() {
      return this.findCompanyUseCase.execute();
    }
  
    @Get('email/:email')
    async findByEmail(@Param('email') email: string) {
      return this.findCompanyByEmailUseCase.execute(email);
    }
  
    @Get('cnpj/:cnpj')
    async findByCnpj(@Param('cnpj') cnpj: string) {
      return this.findCompanyByCnpjUseCase.execute(new UniqueEntityCnpj(cnpj));
    }
    @Public()
    @Post('/create_company')
    async create(@Body() body: { cnpj: string; name: string; phone: string; email: string }) {
      try {
        return await this.createCompanyUseCase.execute({
          ...body,
          cnpj: new UniqueEntityCnpj(body.cnpj)
        });
      } catch (error) {
        if (error.message && error.message.includes('CNPJ')) {
          throw new BadRequestException(error.message);
        }
        throw error;
      }
    }
  
    @Put(':cnpj')
    async update(@Param('cnpj') cnpj: string, @Body() body: any) {
      return this.updateCompanyUseCase.execute(new UniqueEntityCnpj(cnpj), body);
    }
  

  }
  