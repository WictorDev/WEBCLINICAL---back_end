import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { ScheduleController } from '../controllers/schedule.controller';
import { PrismaScheduleRepository } from '../db/repositories/prisma-schedule.repository';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { CreateScheduleUseCase } from '../../use-case/schedule/create-schedule.usecase';
import { UpdateScheduleUseCase } from '../../use-case/schedule/update-schedule.usecase';
import { DeleteScheduleUseCase } from '../../use-case/schedule/delete-schedule.usecase';
import { FindScheduleByIdUseCase } from '../../use-case/schedule/find-schedule-by-id.usecase';
import { FindSchedulesByEmployeeUseCase } from '../../use-case/schedule/find-schedules-by-employee.usecase';
import { FindAvailableSchedulesUseCase } from '../../use-case/schedule/find-available-schedules.usecase';
import { FindAllAvailableSchedulesUseCase } from '../../use-case/schedule/find-all-avaiable-schedules.usecase';
import { FindAllSchedulesUseCase } from '../../use-case/schedule/find-all-schedules.usecase';
import { AppointmentModule } from './appointment.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AppointmentModule),
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
    FindSchedulesByEmployeeUseCase,
    FindAvailableSchedulesUseCase,
    FindAllAvailableSchedulesUseCase,
    FindAllSchedulesUseCase,
  ],
  exports: [
    ScheduleRepository,
    PrismaScheduleRepository,
    CreateScheduleUseCase,
    UpdateScheduleUseCase,
    DeleteScheduleUseCase,
    FindScheduleByIdUseCase,
    FindSchedulesByEmployeeUseCase,
    FindAvailableSchedulesUseCase,
    FindAllAvailableSchedulesUseCase,
    FindAllSchedulesUseCase,
  ],
})
export class ScheduleModule {} 