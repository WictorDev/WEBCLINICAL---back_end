import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Schedule } from '../../domain/entities/schedule';
export declare class FindAvailableSchedulesUseCase {
    private readonly scheduleRepository;
    constructor(scheduleRepository: ScheduleRepository);
    execute(employeeId: string, date?: Date): Promise<Schedule[]>;
}
