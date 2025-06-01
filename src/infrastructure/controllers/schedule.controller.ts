import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseDatePipe, UseGuards } from '@nestjs/common';
import { CreateScheduleUseCase } from '../../use-case/schedule/create-schedule.usecase';
import { UpdateScheduleUseCase } from '../../use-case/schedule/update-schedule.usecase';
import { DeleteScheduleUseCase } from '../../use-case/schedule/delete-schedule.usecase';
import { FindScheduleByIdUseCase } from '../../use-case/schedule/find-schedule-by-id.usecase';
import { FindSchedulesByEmployeeUseCase } from '../../use-case/schedule/find-schedules-by-employee.usecase';
import { FindAvailableSchedulesUseCase } from '../../use-case/schedule/find-available-schedules.usecase';
import { FindAllAvailableSchedulesUseCase } from '../../use-case/schedule/find-all-avaiable-schedules.usecase';
import { Schedule } from '../../domain/entities/schedule';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiTags('schedules')
@Controller('api/schedules')
@UseGuards(JwtAuthGuard)
export class ScheduleController {
  constructor(
    private readonly createScheduleUseCase: CreateScheduleUseCase,
    private readonly updateScheduleUseCase: UpdateScheduleUseCase,
    private readonly deleteScheduleUseCase: DeleteScheduleUseCase,
    private readonly findScheduleByIdUseCase: FindScheduleByIdUseCase,
    private readonly findSchedulesByEmployeeUseCase: FindSchedulesByEmployeeUseCase,
    private readonly findAvailableSchedulesUseCase: FindAvailableSchedulesUseCase,
    private readonly findAllAvailableSchedulesUseCase: FindAllAvailableSchedulesUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova agenda' })
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        date: { 
          type: 'string', 
          format: 'date-time', 
          example: '2024-03-20T10:00:00Z',
          description: 'Data da agenda'
        },
        startTime: { 
          type: 'string', 
          example: '09:00',
          description: 'Horário de início no formato HH:mm'
        },
        endTime: { 
          type: 'string', 
          example: '12:00',
          description: 'Horário de fim no formato HH:mm'
        },
        employeeId: { 
          type: 'string', 
          example: '98765432100',
          description: 'CPF do funcionário'
        },
        slotDuration: { 
          type: 'number',
          example: 30,
          description: 'Duração de cada slot em minutos'
        }
      },
      required: ['date', 'startTime', 'endTime', 'employeeId']
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Agenda criada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
        date: { type: 'string', format: 'date-time', example: '2024-03-20T10:00:00Z' },
        startTime: { type: 'string', example: '09:00' },
        endTime: { type: 'string', example: '12:00' },
        employeeId: { type: 'string', example: '987.654.321-00' },
        active: { type: 'boolean', example: true }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'Conflito de horário' })
  async create(@Body() data: {
    date: Date;
    startTime: string;
    endTime: string;
    employeeId: string;
    slotDuration: number;
  }): Promise<Schedule> {
    return this.createScheduleUseCase.execute(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma agenda existente' })
  @ApiParam({ name: 'id', description: 'ID da agenda' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        date: { type: 'string', format: 'date-time', example: '2024-03-20T10:00:00Z' },
        startTime: { type: 'string', example: '09:00' },
        endTime: { type: 'string', example: '09:30' },
        duration: { type: 'number', example: 30 },
        employeeId: { type: 'string', example: '123.456.789-00' },
        active: { type: 'boolean', example: true }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Agenda atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Agenda não encontrada' })
  async update(
    @Param('id') id: string,
    @Body() data: {
      date?: Date;
      startTime?: string;
      endTime?: string;
      duration?: number;
      employeeId?: string;
      active?: boolean;
    },
  ): Promise<Schedule> {
    return this.updateScheduleUseCase.execute({ id, ...data });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma agenda' })
  @ApiParam({ name: 'id', description: 'ID da agenda' })
  @ApiResponse({ status: 200, description: 'Agenda excluída com sucesso' })
  @ApiResponse({ status: 404, description: 'Agenda não encontrada' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteScheduleUseCase.execute(id);
  }

  @Get('available')
  @ApiOperation({ summary: 'Lista todas as agendas disponíveis' })
  @ApiQuery({ name: 'includeAppointments', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Lista de agendas disponíveis' })
  async findAllAvailable(@Query('includeAppointments') includeAppointments?: boolean) {
    return this.findAllAvailableSchedulesUseCase.execute(true, includeAppointments);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma agenda por ID' })
  @ApiParam({ name: 'id', description: 'ID da agenda' })
  @ApiResponse({ status: 200, description: 'Agenda encontrada' })
  @ApiResponse({ status: 404, description: 'Agenda não encontrada' })
  async findById(@Param('id') id: string): Promise<Schedule> {
    return this.findScheduleByIdUseCase.execute(id);
  }

  @Get('employee/:employeeId')
  @ApiOperation({ summary: 'Listar agendas de um funcionário' })
  @ApiParam({ name: 'employeeId', description: 'CPF do funcionário' })
  @ApiQuery({ name: 'date', required: false, type: Date, description: 'Data para filtrar as agendas' })
  @ApiResponse({ status: 200, description: 'Lista de agendas encontrada' })
  async findByEmployee(
    @Param('employeeId') employeeId: string,
    @Query('date', new ParseDatePipe({ optional: true })) date?: Date,
  ): Promise<Schedule[]> {
    return this.findSchedulesByEmployeeUseCase.execute(employeeId, date);
  }

  @Get('available/:employeeId')
  @ApiOperation({ summary: 'Listar agendas disponíveis de um funcionário' })
  @ApiParam({ name: 'employeeId', description: 'CPF do funcionário' })
  @ApiQuery({ name: 'date', required: false, type: Date, description: 'Data para filtrar as agendas' })
  @ApiResponse({ status: 200, description: 'Lista de agendas disponíveis encontrada' })
  async findAvailable(
    @Param('employeeId') employeeId: string,
    @Query('date', new ParseDatePipe({ optional: true })) date?: Date,
  ): Promise<Schedule[]> {
    return this.findAvailableSchedulesUseCase.execute(employeeId, date);
  }
} 