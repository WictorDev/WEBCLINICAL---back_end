import { ScheduleRepository } from 'src/domain/repositories/schedule.repository';
export declare class FindAllSchedulesUseCase {
    private readonly scheduleRepository;
    constructor(scheduleRepository: ScheduleRepository);
    execute(): Promise<import("../../domain/entities/schedule").Schedule[]>;
}
