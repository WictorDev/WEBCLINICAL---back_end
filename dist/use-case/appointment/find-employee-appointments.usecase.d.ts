import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment';
export declare class FindEmployeeAppointmentsUseCase {
    private readonly appointmentRepository;
    constructor(appointmentRepository: AppointmentRepository);
    execute(employeeId: string, date?: Date): Promise<Appointment[]>;
}
