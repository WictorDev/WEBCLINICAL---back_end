import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Schedule } from '../../domain/entities/schedule';
export declare class CreateScheduleUseCase {
    private readonly scheduleRepository;
    constructor(scheduleRepository: ScheduleRepository);
    private hasTimeConflict;
    execute(data: {
        date: Date;
        startTime: string;
        duration: number;
        employeeId: string;
    }): Promise<Schedule>;
}
