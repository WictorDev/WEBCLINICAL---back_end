import { PrismaService } from '../../../core/services/prisma.service';
import { ScheduleRepository } from '../../../domain/repositories/schedule.repository';
import { Schedule } from '../../../domain/entities/schedule';
export declare class PrismaScheduleRepository implements ScheduleRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAvailableByEmployee(employeeId: string, dayOfWeek: number): Promise<Schedule[]>;
    create(schedule: Schedule): Promise<Schedule>;
}
