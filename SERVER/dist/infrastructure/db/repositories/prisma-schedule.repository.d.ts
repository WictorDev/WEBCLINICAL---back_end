import { PrismaService } from '../../../core/services/prisma.service';
import { ScheduleRepository } from '../../../domain/repositories/schedule.repository';
import { Schedule } from '../../../domain/entities/schedule';
export declare class PrismaScheduleRepository implements ScheduleRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(schedule: Schedule): Promise<Schedule>;
    update(id: string, data: Partial<Schedule>): Promise<Schedule>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Schedule | null>;
    findAll(): Promise<Schedule[]>;
    findByEmployeeId(employeeId: string): Promise<Schedule[]>;
    findAvailableByEmployeeId(employeeId: string, active: true): Promise<Schedule[]>;
    findByDate(employeeId: string, date: Date): Promise<Schedule[]>;
    findAvailableByDate(employeeId: string, date: Date, active: true): Promise<Schedule[]>;
    findAllAvailable(): Promise<any[]>;
}
