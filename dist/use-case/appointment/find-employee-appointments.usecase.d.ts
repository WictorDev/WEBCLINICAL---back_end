import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment, AppointmentStatus, AppointmentWithPatient } from '../../domain/entities/appointment';
export declare class FindEmployeeAppointmentsUseCase {
    private readonly appointmentRepository;
    constructor(appointmentRepository: AppointmentRepository);
    execute(employeeId: string, date?: Date): Promise<Appointment[]>;
    executeByScheduleIdAndStatus(scheduleId: string, status: AppointmentStatus): Promise<Appointment[]>;
    executeByEmployeeAndSchedule(employeeId: string, scheduleId: string): Promise<AppointmentWithPatient[]>;
}
