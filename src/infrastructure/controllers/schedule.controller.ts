import { Controller, Get, Query, UseGuards, Post, Body } from '@nestjs/common';
import { FindAvailableSchedulesUseCase } from '../../use-case/schedule/find-available-schedules.usecase';
import { CreateScheduleUseCase } from '../../use-case/schedule/create-schedule.usecase';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Schedule } from '../../domain/entities/schedule';
import { randomUUID } from 'crypto';

@Controller('schedules')
@UseGuards(JwtAuthGuard)
export class ScheduleController {
  constructor(
    private readonly findAvailableSchedules: FindAvailableSchedulesUseCase,
    private readonly createSchedule: CreateScheduleUseCase,
  ) {}

  @Get('available')
  async getAvailable(@Query('employeeId') employeeId: string, @Query('dayOfWeek') dayOfWeek: number) {
    return this.findAvailableSchedules.execute(employeeId, Number(dayOfWeek));
  }
  
  @Post()
  async create(@Body() scheduleData: Omit<Schedule, 'id'>) {
    const schedule = new Schedule({
      id: randomUUID(),
      dayOfWeek: scheduleData.dayOfWeek,
      startTime: scheduleData.startTime,
      endTime: scheduleData.endTime,
      employeeId: scheduleData.employeeId
    });
    
    return this.createSchedule.execute(schedule);
  }
} 