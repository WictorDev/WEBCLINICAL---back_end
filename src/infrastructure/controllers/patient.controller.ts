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
import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';
import { UpdatePatientUseCase } from 'src/use-case/patient/update-patient.usecase';
import { Public } from '../auth/public.decorator';

@ApiTags('patients')
@Controller('/api/patients')
@UseGuards(JwtAuthGuard)
export class PatientController {
  constructor(
    private readonly createPatientUseCase: CreatePatientUseCase,
    private readonly findPatientUseCase: FindPatientUseCase,
    private readonly findPatientByCpfUseCase: FindPatientByCpfUseCase,
    private readonly findPatientByEmailUseCase: FindPatientByEmailUseCase,
    private readonly updatePatientUseCase: UpdatePatientUseCase,
    private readonly findAllPatientsUseCase: FindPatientUseCase
  ) {}

  @Get()
  async findAll() {
    return this.findAllPatientsUseCase.execute();
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.findPatientByEmailUseCase.execute(email);
  }

  @Get('cpf/:cpf')
  async findByCpf(@Param('cpf') cpf: string) {
    return this.findPatientByCpfUseCase.execute(new UniqueEntityCpf(cpf));
  }
  
  @Public()
  @Post('/register')
  async register(
    @Body() body: { 
      cpf: string; 
      name: string; 
      email: string;
      password: string;
      type: `PATIENT`;
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

  @Put(':cpf')
  async update(
    @Param('cpf') cpf: string,
    @Body() data: { name?: string; email?: string; password?: string },
  ) {
    return await this.updatePatientUseCase.execute(new UniqueEntityCpf(cpf), data);
  }
} 