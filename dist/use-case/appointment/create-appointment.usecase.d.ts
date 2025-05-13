import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment';
export declare class CreateAppointmentUseCase {
    private readonly appointmentRepository;
    constructor(appointmentRepository: AppointmentRepository);
    execute(appointment: Appointment): Promise<Appointment>;
}
