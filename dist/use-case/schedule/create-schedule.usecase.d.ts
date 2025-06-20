import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Schedule } from '../../domain/entities/schedule';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
export declare class CreateScheduleUseCase {
    private readonly scheduleRepository;
    private readonly appointmentRepository;
    constructor(scheduleRepository: ScheduleRepository, appointmentRepository: AppointmentRepository);
    private hasTimeConflict;
    private isPastDateTime;
    execute(data: {
        date: string | Date;
        startTime: string;
        endTime: string;
        employeeId: string;
        slotDuration: number;
    }): Promise<Schedule>;
}
