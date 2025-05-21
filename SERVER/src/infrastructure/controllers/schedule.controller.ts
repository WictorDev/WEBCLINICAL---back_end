import { Controller, Get, Query, UseGuards, Post, Body, UnauthorizedException, Req, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { FindAvailableSchedulesUseCase } from '../../use-case/schedule/find-available-schedules.usecase';
import { CreateScheduleUseCase } from '../../use-case/schedule/create-schedule.usecase';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Schedule } from '../../domain/entities/schedule';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../core/services/prisma.service';
import { Public } from '../auth/public.decorator';

@Controller('/api/schedules')
@UseGuards(JwtAuthGuard)
export class ScheduleController {
  private readonly logger = new Logger(ScheduleController.name);

  constructor(
    private readonly findAvailableSchedules: FindAvailableSchedulesUseCase,
    private readonly createSchedule: CreateScheduleUseCase,
    private readonly prismaService: PrismaService
  ) {}

  @Get('available')
  @Public()
  async getAvailable(@Query('employeeId') employeeId: string, @Query('dayOfWeek') dayOfWeek: number) {
    this.logger.log(`Buscando horários disponíveis para funcionário ${employeeId} no dia ${dayOfWeek}`);
    return this.findAvailableSchedules.execute(employeeId, Number(dayOfWeek));
  }
  
  @Post()
  @Public()
  async create(@Body() scheduleData: Omit<Schedule, 'id'>, @Req() req) {
    this.logger.log(`Tentando criar agendamento: ${JSON.stringify(scheduleData)}`);
    
    try {
      // Para a apresentação, vamos remover as verificações de permissão
      // e focar apenas na criação do agendamento
      
      // Validar dados de entrada
      if (!scheduleData.employeeId) {
        throw new BadRequestException('ID do funcionário é obrigatório');
      }
      
      if (scheduleData.dayOfWeek < 0 || scheduleData.dayOfWeek > 6) {
        throw new BadRequestException('Dia da semana inválido (0-6)');
      }
      
      if (!scheduleData.startTime || !scheduleData.endTime) {
        throw new BadRequestException('Horários de início e fim são obrigatórios');
      }
      
      // Verificar se o funcionário existe
      const employeeExists = await this.prismaService.employee.findUnique({
        where: { cpf: scheduleData.employeeId }
      });
      
      if (!employeeExists) {
        this.logger.warn(`Funcionário não encontrado: ${scheduleData.employeeId}`);
        throw new BadRequestException('Funcionário não encontrado');
      }
      
      // Criar a agenda com os dados fornecidos
      const schedule = new Schedule(
        randomUUID(),
        scheduleData.dayOfWeek,
        scheduleData.startTime,
        scheduleData.endTime,
        scheduleData.employeeId
      );
      
      this.logger.log(`Criando agendamento: ${JSON.stringify(schedule)}`);
      const result = await this.createSchedule.execute(schedule);
      this.logger.log(`Agendamento criado com sucesso: ${JSON.stringify(result)}`);
      
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      
      this.logger.error(`Erro ao criar agendamento: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Erro ao criar agendamento');
    }
  }
} 