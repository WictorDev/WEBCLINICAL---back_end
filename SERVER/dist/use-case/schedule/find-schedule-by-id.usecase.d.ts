import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Schedule } from '../../domain/entities/schedule';
export declare class FindScheduleByIdUseCase {
    private readonly scheduleRepository;
    constructor(scheduleRepository: ScheduleRepository);
    execute(id: string): Promise<Schedule>;
}
