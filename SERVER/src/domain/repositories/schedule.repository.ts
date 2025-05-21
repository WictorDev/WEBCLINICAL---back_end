import { Schedule } from '../entities/schedule';

export abstract class ScheduleRepository {
  abstract create(schedule: Schedule): Promise<Schedule>;
  abstract update(id: string, schedule: Partial<Schedule>): Promise<Schedule>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Schedule | null>;
  abstract findAll(): Promise<Schedule[]>;
  abstract findByEmployeeId(employeeId: string): Promise<Schedule[]>;
  abstract findAvailableByEmployeeId(employeeId: string, active:true): Promise<Schedule[]>;
  abstract findByDate(employeeId: string, date: Date): Promise<Schedule[]>;
  abstract findAvailableByDate(employeeId: string, date: Date, active:true): Promise<Schedule[]>;
} 