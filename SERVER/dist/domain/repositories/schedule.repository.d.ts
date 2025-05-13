import { Schedule } from '../entities/schedule';
export interface ScheduleRepository {
    findAvailableByEmployee(employeeId: string, dayOfWeek: number): Promise<Schedule[]>;
    create(schedule: Schedule): Promise<Schedule>;
}
