import { ScheduleRepository } from 'src/domain/repositories/schedule.repository';
import { Schedule } from 'src/domain/entities/schedule';
export declare class CreateScheduleUseCase {
    private readonly scheduleRepository;
    constructor(scheduleRepository: ScheduleRepository);
    execute(data: {
        date: Date;
        startTime: string;
        endTime: string;
        duration: number;
        totalSlots: number;
        availableSlots: number;
        employeeId: string;
        active: boolean;
    }): Promise<Schedule>;
}
