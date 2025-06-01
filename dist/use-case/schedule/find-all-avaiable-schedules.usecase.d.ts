import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
export declare class FindAllAvailableSchedulesUseCase {
    private readonly scheduleRepository;
    constructor(scheduleRepository: ScheduleRepository);
    execute(active?: boolean, includeAppointments?: boolean): Promise<any[]>;
}
