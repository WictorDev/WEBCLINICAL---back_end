import { CreateScheduleUseCase } from '../../use-case/schedule/create-schedule.usecase';
import { UpdateScheduleUseCase } from '../../use-case/schedule/update-schedule.usecase';
import { DeleteScheduleUseCase } from '../../use-case/schedule/delete-schedule.usecase';
import { FindScheduleByIdUseCase } from '../../use-case/schedule/find-schedule-by-id.usecase';
import { FindSchedulesByEmployeeUseCase } from '../../use-case/schedule/find-schedules-by-employee.usecase';
import { FindAvailableSchedulesUseCase } from '../../use-case/schedule/find-available-schedules.usecase';
import { Schedule } from '../../domain/entities/schedule';
export declare class ScheduleController {
    private readonly createScheduleUseCase;
    private readonly updateScheduleUseCase;
    private readonly deleteScheduleUseCase;
    private readonly findScheduleByIdUseCase;
    private readonly findSchedulesByEmployeeUseCase;
    private readonly findAvailableSchedulesUseCase;
    constructor(createScheduleUseCase: CreateScheduleUseCase, updateScheduleUseCase: UpdateScheduleUseCase, deleteScheduleUseCase: DeleteScheduleUseCase, findScheduleByIdUseCase: FindScheduleByIdUseCase, findSchedulesByEmployeeUseCase: FindSchedulesByEmployeeUseCase, findAvailableSchedulesUseCase: FindAvailableSchedulesUseCase);
    create(data: {
        date: Date;
        startTime: string;
        duration: number;
        totalSlots: number;
        employeeId: string;
    }): Promise<Schedule>;
    update(id: string, data: {
        date?: Date;
        startTime?: string;
        endTime?: string;
        duration?: number;
        totalSlots?: number;
        availableSlots?: number;
        employeeId?: string;
        active?: boolean;
    }): Promise<Schedule>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Schedule>;
    findByEmployee(employeeId: string, date?: Date): Promise<Schedule[]>;
    findAvailable(employeeId: string, date?: Date): Promise<Schedule[]>;
}
