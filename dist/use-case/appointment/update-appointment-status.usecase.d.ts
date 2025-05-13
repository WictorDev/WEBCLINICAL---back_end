import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment';
export declare class UpdateAppointmentStatusUseCase {
    private readonly appointmentRepository;
    constructor(appointmentRepository: AppointmentRepository);
    execute(appointmentId: string, status: string): Promise<Appointment>;
}
