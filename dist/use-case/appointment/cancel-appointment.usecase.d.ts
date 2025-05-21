import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
export declare class CancelAppointmentUseCase {
    private readonly appointmentRepository;
    private readonly scheduleRepository;
    constructor(appointmentRepository: AppointmentRepository, scheduleRepository: ScheduleRepository);
    execute(id: string): Promise<void>;
}
