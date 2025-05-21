import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  UseGuards,
  BadRequestException
} from '@nestjs/common';
import { CreatePatientUseCase } from 'src/use-case/patient/create-patient.usecase';
import { FindPatientUseCase } from 'src/use-case/patient/find-patient.usecase';
import { FindPatientByCpfUseCase } from 'src/use-case/patient/find-patient-by-cpf.usecase';
import { FindPatientByEmailUseCase } from 'src/use-case/patient/find-patient-by-email.usecase';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/infrastructure/auth/public.decorator';
import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';

@ApiTags('patients')
@Controller('/api/patients')
@UseGuards(JwtAuthGuard)
export class PatientController {
  constructor(
    private readonly createPatientUseCase: CreatePatientUseCase,
    private readonly findPatientUseCase: FindPatientUseCase,
    private readonly findPatientByCpfUseCase: FindPatientByCpfUseCase,
    private readonly findPatientByEmailUseCase: FindPatientByEmailUseCase
  ) {}

  @Get()
  async findAll() {
    return this.findPatientUseCase.execute();
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.findPatientByEmailUseCase.execute(email);
  }

  @Get('cpf/:cpf')
  async findByCpf(@Param('cpf') cpf: string) {
    return this.findPatientByCpfUseCase.execute(new UniqueEntityCpf(cpf));
  }
  
  @Post('/register')
  async register(
    @Body() body: { 
      cpf: string; 
      name: string; 
      email: string;
      password: string;
    }
  ) {
    try {
      return await this.createPatientUseCase.execute(body);
    } catch (error) {
      if (error.message && error.message.includes('CPF')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
} 