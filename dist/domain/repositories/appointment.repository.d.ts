import { Appointment, AppointmentStatus, AppointmentWithPatient } from '../entities/appointment';
export declare abstract class AppointmentRepository {
    abstract findByEmployee(employeeId: string, date?: Date): Promise<Appointment[]>;
    abstract findByPatient(patientId: string): Promise<Appointment[]>;
    abstract findByPatientAndDate(patientId: string, date: Date): Promise<Appointment[]>;
    abstract create(appointment: Appointment): Promise<Appointment>;
    abstract findById(id: string): Promise<Appointment | null>;
    abstract update(id: string, data: Partial<Appointment>): Promise<Appointment>;
    abstract updateStatus(id: string, status: AppointmentStatus): Promise<Appointment>;
    abstract findByScheduleIdAndStatus(scheduleId: string, status: AppointmentStatus): Promise<Appointment[]>;
    abstract findByEmployeeAndSchedule(employeeId: string, scheduleId: string): Promise<AppointmentWithPatient[]>;
}
