import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FindAvailableSchedulesUseCase } from '../../use-case/schedule/find-available-schedules.usecase';
import { AuthGuard } from '../auth/auth.guard';

@Controller('schedules')
@UseGuards(AuthGuard)
export class ScheduleController {
  constructor(private readonly findAvailableSchedules: FindAvailableSchedulesUseCase) {}

  @Get('available')
  async getAvailable(@Query('employeeId') employeeId: string, @Query('dayOfWeek') dayOfWeek: number) {
    return this.findAvailableSchedules.execute(employeeId, Number(dayOfWeek));
  }
} 