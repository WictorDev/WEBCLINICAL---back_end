import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { ScheduleController } from '../controllers/schedule.controller';
import { PrismaScheduleRepository } from '../db/repositories/prisma-schedule.repository';
import { CreateScheduleUseCase } from '../../use-case/schedule/create-schedule.usecase';
import { UpdateScheduleUseCase } from '../../use-case/schedule/update-schedule.usecase';
import { DeleteScheduleUseCase } from '../../use-case/schedule/delete-schedule.usecase';
import { FindScheduleByIdUseCase } from '../../use-case/schedule/find-schedule-by-id.usecase';
import { FindScheduleByEmployeeUseCase } from '../../use-case/schedule/find-schedule-by-employee.usecase';
import { FindScheduleByDateUseCase } from '../../use-case/schedule/find-schedule-by-date.usecase';
import { FindAllSchedulesUseCase } from '../../use-case/schedule/find-all-schedules.usecase';
import { FindScheduleUseCase } from '../../use-case/schedule/find-schedule.usecase';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';

@Module({
  imports: [
    PrismaModule, // fornece PrismaService
  ],
  controllers: [ScheduleController],
  providers: [
    {
      provide: ScheduleRepository,
      useClass: PrismaScheduleRepository,
    },
    PrismaScheduleRepository,
    CreateScheduleUseCase,
    UpdateScheduleUseCase,
    DeleteScheduleUseCase,
    FindScheduleByIdUseCase,
    FindScheduleByEmployeeUseCase,
    FindScheduleByDateUseCase,
    FindAllSchedulesUseCase,
    FindScheduleUseCase,
  ],
  exports: [
    ScheduleRepository,
    PrismaScheduleRepository,
    CreateScheduleUseCase,
    UpdateScheduleUseCase,
    DeleteScheduleUseCase,
    FindScheduleByIdUseCase,
    FindScheduleByEmployeeUseCase,
    FindScheduleByDateUseCase,
    FindAllSchedulesUseCase,
    FindScheduleUseCase,
  ],
})
export class ScheduleModule {} 