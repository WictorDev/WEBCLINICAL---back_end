import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
export declare class DeleteScheduleUseCase {
    private readonly scheduleRepository;
    constructor(scheduleRepository: ScheduleRepository);
    execute(id: string): Promise<void>;
}
