import { ScheduleRepository } from 'src/domain/repositories/schedule.repository';
export declare class FindScheduleByIdUseCase {
    private readonly scheduleRepository;
    constructor(scheduleRepository: ScheduleRepository);
    execute(id: string): Promise<import("../../domain/entities/schedule").Schedule | null>;
}
