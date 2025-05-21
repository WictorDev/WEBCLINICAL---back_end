import { ScheduleRepository } from 'src/domain/repositories/schedule.repository';
export declare class FindScheduleByEmployeeUseCase {
    private readonly scheduleRepository;
    constructor(scheduleRepository: ScheduleRepository);
    findAllByEmployee(employeeId: string): Promise<import("../../domain/entities/schedule").Schedule[]>;
    findAvailableByEmployee(employeeId: string, active?: true): Promise<import("../../domain/entities/schedule").Schedule[]>;
}
