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
import { FindPatientUseCase } from 'src/use-case/patient/find-patient.usecase';
import { FindPatientByCpfUseCase } from 'src/use-case/patient/find-patient-by-cpf.usecase';
import { FindPatientByEmailUseCase } from 'src/use-case/patient/find-patient-by-email.usecase';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { UniqueEntityCpf } from 'src/core/entities/unique-entity-cpf';
import { UpdatePatientUseCase } from 'src/use-case/patient/update-patient.usecase';
import { CreatePatientUseCase } from 'src/use-case/patient/create-patient.usecase';
import { Public } from '../auth/public.decorator';
import { RecoveryPasswordUseCase } from 'src/use-case/patient/recovery-password.usecase';
import { ConfirmPatientRegistrationUseCase } from 'src/use-case/patient/confirm-patient-registration.usecase';

@ApiTags('patients')
@Controller('/api/patients')
@UseGuards(JwtAuthGuard)
export class PatientController {
  constructor(
    private readonly createPatientUseCase: CreatePatientUseCase,
    private readonly findPatientByCpfUseCase: FindPatientByCpfUseCase,
    private readonly findPatientByEmailUseCase: FindPatientByEmailUseCase,
    private readonly updatePatientUseCase: UpdatePatientUseCase,
    private readonly findAllPatientsUseCase: FindPatientUseCase,
    private readonly recoveryPasswordUseCase: RecoveryPasswordUseCase,
    private readonly confirmPatientRegistrationUseCase: ConfirmPatientRegistrationUseCase,
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
      phoneNumber: string;
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

  @Public()
  @Post('/confirm-registration')
  async confirmRegistration(@Body() body: { token: string }) {
    try {
      const patient = await this.confirmPatientRegistrationUseCase.execute(body.token);
      
      return { 
        message: 'Cadastro confirmado com sucesso!',
        patient: {
          cpf: patient.cpf.toString(),
          name: patient.name,
          email: patient.email,
          phoneNumber: patient.phoneNumber
        }
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':cpf')
  async update(
    @Param('cpf') cpf: string,
    @Body() data: { name?: string; email?: string; password?: string; phoneNumber?: string },
  ) {
    return await this.updatePatientUseCase.execute(new UniqueEntityCpf(cpf), data);
  }

  @Put(':email')
  async recoveryPassword(
    @Param('email') email: string,
    @Body() data: { password: string },
  ) {
    return await this.recoveryPasswordUseCase.execute(email, data.password);
  }
} 