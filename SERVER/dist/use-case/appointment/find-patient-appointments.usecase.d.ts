import { AppointmentRepository } from 'src/domain/repositories/appointment.repository';
import { Appointment } from 'src/domain/entities/appointment';
export declare class FindPatientAppointmentsUseCase {
    private readonly appointmentRepository;
    constructor(appointmentRepository: AppointmentRepository);
    execute(patientId: string): Promise<Appointment[]>;
}
