import { Appointment } from '../entities/appointment';

export abstract class AppointmentRepository {
  abstract findByEmployee(employeeId: string, date?: Date): Promise<Appointment[]>;
  abstract findByPatient(patientId: string): Promise<Appointment[]>;
  abstract create(appointment: Appointment): Promise<Appointment>;
  abstract findById(id: string): Promise<Appointment | null>;
  abstract update(id: string, data: Partial<Appointment>): Promise<Appointment>;
  abstract updateStatus(id: string, status: string): Promise<Appointment>;
  abstract findByScheduleIdAndStatus(scheduleId: string, status: string): Promise<Appointment[]>;
  // outros métodos necessários...
} 