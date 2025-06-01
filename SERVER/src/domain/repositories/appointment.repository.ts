import { Appointment } from '../entities/appointment';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export abstract class AppointmentRepository {
  abstract findByEmployee(employeeId: string, date?: Date): Promise<Appointment[]>;
  abstract findByPatient(patientId: string): Promise<Appointment[]>;
  abstract create(appointment: Appointment): Promise<Appointment>;
  abstract findById(id: UniqueEntityID): Promise<Appointment | null>;
  abstract update(id: UniqueEntityID, data: Partial<Appointment>): Promise<Appointment>;
  abstract updateStatus(id: UniqueEntityID, status: string): Promise<Appointment>;
  // outros métodos necessários...
} 