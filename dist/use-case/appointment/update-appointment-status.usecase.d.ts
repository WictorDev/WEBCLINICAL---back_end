import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment, AppointmentStatus } from '../../domain/entities/appointment';
export declare class UpdateAppointmentStatusUseCase {
    private readonly appointmentRepository;
    constructor(appointmentRepository: AppointmentRepository);
    execute(appointmentId: string, status: AppointmentStatus): Promise<Appointment>;
}
