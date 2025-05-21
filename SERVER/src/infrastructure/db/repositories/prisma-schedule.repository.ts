import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../core/services/prisma.service';
import { ScheduleRepository } from '../../../domain/repositories/schedule.repository';
import { Schedule } from '../../../domain/entities/schedule';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaScheduleRepository implements ScheduleRepository {
  private readonly logger = new Logger(PrismaScheduleRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAvailableByEmployee(employeeId: string, dayOfWeek: number): Promise<Schedule[]> {
    this.logger.log(`Buscando agendas disponíveis para funcionário ${employeeId} no dia ${dayOfWeek}`);
    try {
      // Verificar se o funcionário existe
      const employee = await this.prisma.employee.findUnique({
        where: { cpf: employeeId }
      });
      
      if (!employee) {
        this.logger.warn(`Funcionário não encontrado: ${employeeId}`);
        throw new NotFoundException(`Funcionário com CPF ${employeeId} não encontrado`);
      }
      
      const schedules = await this.prisma.schedule.findMany({
        where: { employeeId, dayOfWeek },
      });
      
      this.logger.log(`Encontradas ${schedules.length} agendas para o funcionário ${employeeId}`);
      
      return schedules.map(s => new Schedule(s.id, s.dayOfWeek, s.startTime, s.endTime, s.employeeId));
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Erro ao buscar agendas: ${error.message}`, error.stack);
      return [];
    }
  }

  async create(schedule: Schedule): Promise<Schedule> {
    this.logger.log(`Tentando criar agenda no banco: ${JSON.stringify(schedule)}`);
    try {
      // Verificar se o funcionário existe antes de tentar criar o agendamento
      const employee = await this.prisma.employee.findUnique({
        where: { cpf: schedule.employeeId }
      });
      
      if (!employee) {
        this.logger.warn(`Funcionário não encontrado: ${schedule.employeeId}`);
        throw new NotFoundException(`Funcionário com CPF ${schedule.employeeId} não encontrado`);
      }
      
      // Verificar se já existe um agendamento conflitante
      const existingSchedules = await this.prisma.schedule.findMany({
        where: {
          employeeId: schedule.employeeId,
          dayOfWeek: schedule.dayOfWeek,
          OR: [
            {
              startTime: { lte: schedule.startTime },
              endTime: { gt: schedule.startTime }
            },
            {
              startTime: { lt: schedule.endTime },
              endTime: { gte: schedule.endTime }
            },
            {
              startTime: { gte: schedule.startTime },
              endTime: { lte: schedule.endTime }
            }
          ]
        }
      });
      
      if (existingSchedules.length > 0) {
        this.logger.warn(`Conflito de horário detectado para ${schedule.employeeId} no dia ${schedule.dayOfWeek}`);
        throw new BadRequestException('Já existe um agendamento para este profissional neste horário');
      }
      
      const s = await this.prisma.schedule.create({
        data: {
          id: schedule.id,
          dayOfWeek: schedule.dayOfWeek,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          employeeId: schedule.employeeId,
        },
      });
      
      this.logger.log(`Agenda criada com sucesso: ${JSON.stringify(s)}`);
      return new Schedule(s.id, s.dayOfWeek, s.startTime, s.endTime, s.employeeId);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Tratamento específico para erros do Prisma
        if (error.code === 'P2002') {
          this.logger.error('Conflito de chave única ao criar agenda');
          throw new BadRequestException('Já existe um agendamento com essas características');
        } else if (error.code === 'P2003') {
          this.logger.error('Violação de chave estrangeira ao criar agenda');
          throw new BadRequestException('O funcionário informado não existe');
        }
      }
      
      this.logger.error(`Erro ao criar agenda: ${error.message}`, error.stack);
      throw new BadRequestException('Erro ao criar agenda');
    }
  }
} 