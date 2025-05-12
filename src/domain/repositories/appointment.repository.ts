import { Appointment } from '../entities/appointment';

export interface AppointmentRepository {
  findByEmployee(employeeId: string, date?: Date): Promise<Appointment[]>;
  findByPatient(patientId: string): Promise<Appointment[]>;
  create(appointment: Appointment): Promise<Appointment>;
  updateStatus(id: string, status: string): Promise<Appointment>;
  // outros métodos necessários...
} 