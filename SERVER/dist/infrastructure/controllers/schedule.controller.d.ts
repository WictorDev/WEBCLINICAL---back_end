import { Schedule } from '../../domain/entities/schedule';
import { CreateScheduleUseCase } from '../../use-case/schedule/create-schedule.usecase';
import { UpdateScheduleUseCase } from '../../use-case/schedule/update-schedule.usecase';
import { DeleteScheduleUseCase } from '../../use-case/schedule/delete-schedule.usecase';
import { FindScheduleByIdUseCase } from '../../use-case/schedule/find-schedule-by-id.usecase';
import { FindScheduleByEmployeeUseCase } from '../../use-case/schedule/find-schedule-by-employee.usecase';
import { FindScheduleByDateUseCase } from '../../use-case/schedule/find-schedule-by-date.usecase';
import { FindAllSchedulesUseCase } from '../../use-case/schedule/find-all-schedules.usecase';
export declare class ScheduleController {
    private readonly createSchedule;
    private readonly updateSchedule;
    private readonly deleteSchedule;
    private readonly findScheduleById;
    private readonly findScheduleByEmployee;
    private readonly findScheduleByDate;
    private readonly findAllSchedules;
    constructor(createSchedule: CreateScheduleUseCase, updateSchedule: UpdateScheduleUseCase, deleteSchedule: DeleteScheduleUseCase, findScheduleById: FindScheduleByIdUseCase, findScheduleByEmployee: FindScheduleByEmployeeUseCase, findScheduleByDate: FindScheduleByDateUseCase, findAllSchedules: FindAllSchedulesUseCase);
    findAll(): Promise<Schedule[]>;
    findById(id: string): Promise<Schedule | null>;
    findByEmployee(employeeId: string): Promise<Schedule[]>;
    findAvailableByEmployee(employeeId: string): Promise<Schedule[]>;
    findByDate(employeeId: string, date: string): Promise<Schedule[]>;
    findAvailableByDate(employeeId: string, date: string): Promise<Schedule[]>;
    create(scheduleData: Omit<Schedule, 'id'>): Promise<Schedule>;
    update(id: string, scheduleData: Partial<Schedule>): Promise<Schedule>;
    delete(id: string): Promise<void>;
}
