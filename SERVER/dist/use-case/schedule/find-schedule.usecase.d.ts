import { Schedule } from "../../domain/entities/schedule";
import { ScheduleRepository } from "../../domain/repositories/schedule.repository";
export declare class FindScheduleUseCase {
    private scheduleRepository;
    constructor(scheduleRepository: ScheduleRepository);
    findById(id: string): Promise<Schedule | null>;
    findAll(): Promise<Schedule[]>;
    findByEmployeeId(employeeId: string): Promise<Schedule[]>;
    findAvailableByEmployeeId(employeeId: string, active?: true): Promise<Schedule[]>;
    findByDate(employeeId: string, date: Date): Promise<Schedule[]>;
    findAvailableByDate(employeeId: string, date: Date, active?: true): Promise<Schedule[]>;
}
