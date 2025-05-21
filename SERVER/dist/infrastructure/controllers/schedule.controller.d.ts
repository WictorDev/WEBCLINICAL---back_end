import { FindAvailableSchedulesUseCase } from '../../use-case/schedule/find-available-schedules.usecase';
import { CreateScheduleUseCase } from '../../use-case/schedule/create-schedule.usecase';
import { Schedule } from '../../domain/entities/schedule';
import { PrismaService } from '../../core/services/prisma.service';
export declare class ScheduleController {
    private readonly findAvailableSchedules;
    private readonly createSchedule;
    private readonly prismaService;
    private readonly logger;
    constructor(findAvailableSchedules: FindAvailableSchedulesUseCase, createSchedule: CreateScheduleUseCase, prismaService: PrismaService);
    getAvailable(employeeId: string, dayOfWeek: number): Promise<Schedule[]>;
    create(scheduleData: Omit<Schedule, 'id'>, req: any): Promise<Schedule>;
}
