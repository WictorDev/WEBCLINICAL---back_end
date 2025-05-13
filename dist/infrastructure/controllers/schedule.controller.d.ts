import { FindAvailableSchedulesUseCase } from '../../use-case/schedule/find-available-schedules.usecase';
import { CreateScheduleUseCase } from '../../use-case/schedule/create-schedule.usecase';
import { Schedule } from '../../domain/entities/schedule';
export declare class ScheduleController {
    private readonly findAvailableSchedules;
    private readonly createSchedule;
    constructor(findAvailableSchedules: FindAvailableSchedulesUseCase, createSchedule: CreateScheduleUseCase);
    getAvailable(employeeId: string, dayOfWeek: number): Promise<Schedule[]>;
    create(scheduleData: Omit<Schedule, 'id'>): Promise<Schedule>;
}
