import { Controller, Get, Query, UseGuards, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Schedule } from '../../domain/entities/schedule';
import { randomUUID } from 'crypto';
import { CreateScheduleUseCase } from '../../use-case/schedule/create-schedule.usecase';
import { UpdateScheduleUseCase } from '../../use-case/schedule/update-schedule.usecase';
import { DeleteScheduleUseCase } from '../../use-case/schedule/delete-schedule.usecase';
import { FindScheduleByIdUseCase } from '../../use-case/schedule/find-schedule-by-id.usecase';
import { FindScheduleByEmployeeUseCase } from '../../use-case/schedule/find-schedule-by-employee.usecase';
import { FindScheduleByDateUseCase } from '../../use-case/schedule/find-schedule-by-date.usecase';
import { FindAllSchedulesUseCase } from '../../use-case/schedule/find-all-schedules.usecase';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('schedules')
@Controller('schedules')
@UseGuards(JwtAuthGuard)
export class ScheduleController {
  constructor(
    private readonly createSchedule: CreateScheduleUseCase,
    private readonly updateSchedule: UpdateScheduleUseCase,
    private readonly deleteSchedule: DeleteScheduleUseCase,
    private readonly findScheduleById: FindScheduleByIdUseCase,
    private readonly findScheduleByEmployee: FindScheduleByEmployeeUseCase,
    private readonly findScheduleByDate: FindScheduleByDateUseCase,
    private readonly findAllSchedules: FindAllSchedulesUseCase,
  ) {}

  @Get()
  async findAll() {
    return this.findAllSchedules.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.findScheduleById.execute(id);
  }

  @Get('employee/:employeeId')
  async findByEmployee(@Param('employeeId') employeeId: string) {
    return this.findScheduleByEmployee.findAllByEmployee(employeeId);
  }

  @Get('employee/:employeeId/available')
  async findAvailableByEmployee(@Param('employeeId') employeeId: string) {
    return this.findScheduleByEmployee.findAvailableByEmployee(employeeId);
  }

  @Get('date/:employeeId')
  async findByDate(
    @Param('employeeId') employeeId: string,
    @Query('date') date: string,
  ) {
    return this.findScheduleByDate.findByDate(employeeId, new Date(date));
  }

  @Get('date/:employeeId/available')
  async findAvailableByDate(
    @Param('employeeId') employeeId: string,
    @Query('date') date: string,
  ) {
    return this.findScheduleByDate.findAvailableByDate(employeeId, new Date(date));
  }
  
  @Post()
  async create(@Body() scheduleData: Omit<Schedule, 'id'>) {
    const schedule = new Schedule({
      id: randomUUID(),
      date: new Date(scheduleData.date),
      startTime: scheduleData.startTime,
      endTime: scheduleData.endTime,
      duration: scheduleData.duration,
      totalSlots: scheduleData.totalSlots,
      availableSlots: scheduleData.availableSlots,
      employeeId: scheduleData.employeeId,
      active: scheduleData.active,
    });
    
    return this.createSchedule.execute(schedule);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() scheduleData: Partial<Schedule>,
  ) {
    return this.updateSchedule.execute({
      id,
      ...scheduleData,
      date: scheduleData.date ? new Date(scheduleData.date) : undefined,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteSchedule.execute(id);
  }
} 