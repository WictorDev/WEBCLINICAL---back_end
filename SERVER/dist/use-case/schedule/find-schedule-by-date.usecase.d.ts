import { ScheduleRepository } from 'src/domain/repositories/schedule.repository';
export declare class FindScheduleByDateUseCase {
    private readonly scheduleRepository;
    constructor(scheduleRepository: ScheduleRepository);
    findByDate(employeeId: string, date: Date): Promise<import("../../domain/entities/schedule").Schedule[]>;
    findAvailableByDate(employeeId: string, date: Date, active?: true): Promise<import("../../domain/entities/schedule").Schedule[]>;
}
