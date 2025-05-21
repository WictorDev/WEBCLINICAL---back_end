import { Schedule } from "../../domain/entities/schedule";
import { ScheduleRepository } from "../../domain/repositories/schedule.repository";
interface UpdateScheduleUseCaseRequest {
    id: string;
    date?: Date;
    startTime?: string;
    endTime?: string;
    duration?: number;
    totalSlots?: number;
    availableSlots?: number;
    employeeId?: string;
    active?: boolean;
}
export declare class UpdateScheduleUseCase {
    private scheduleRepository;
    constructor(scheduleRepository: ScheduleRepository);
    execute(data: UpdateScheduleUseCaseRequest): Promise<Schedule>;
}
export {};
