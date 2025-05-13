import { Schedule } from '../../domain/entities/schedule';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
export declare class CreateScheduleUseCase {
    private readonly scheduleRepository;
    constructor(scheduleRepository: ScheduleRepository);
    execute(schedule: Schedule): Promise<Schedule>;
}
