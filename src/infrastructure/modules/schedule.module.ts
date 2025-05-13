import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { ScheduleController } from '../controllers/schedule.controller';
import { PrismaScheduleRepository } from '../db/repositories/prisma-schedule.repository';
import { FindAvailableSchedulesUseCase } from '../../use-case/schedule/find-available-schedules.usecase';
import { CreateScheduleUseCase } from '../../use-case/schedule/create-schedule.usecase';
import { SCHEDULE_REPOSITORY_TOKEN } from '../constants/tokens.constants';

@Module({
  imports: [
    PrismaModule, // fornece PrismaService
  ],
  controllers: [ScheduleController],
  providers: [
    {
      provide: SCHEDULE_REPOSITORY_TOKEN,
      useClass: PrismaScheduleRepository,
    },
    PrismaScheduleRepository,
    FindAvailableSchedulesUseCase,
    CreateScheduleUseCase,
  ],
  exports: [
    SCHEDULE_REPOSITORY_TOKEN,
    PrismaScheduleRepository,
    FindAvailableSchedulesUseCase,
    CreateScheduleUseCase,
  ],
})
export class ScheduleModule {} 