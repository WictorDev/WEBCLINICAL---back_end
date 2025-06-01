import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Appointment } from '../../domain/entities/appointment';
export declare class CreateAppointmentUseCase {
    private readonly appointmentRepository;
    private readonly scheduleRepository;
    constructor(appointmentRepository: AppointmentRepository, scheduleRepository: ScheduleRepository);
    execute(appointment: Appointment): Promise<Appointment>;
}
