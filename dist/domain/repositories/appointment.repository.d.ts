import { Appointment } from '../entities/appointment';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
export interface AppointmentRepository {
    findByEmployee(employeeId: string, date?: Date): Promise<Appointment[]>;
    findByPatient(patientId: string): Promise<Appointment[]>;
    create(appointment: Appointment): Promise<Appointment>;
    findById(id: UniqueEntityID): Promise<Appointment | null>;
    update(id: UniqueEntityID, data: Partial<Appointment>): Promise<Appointment>;
    updateStatus(id: UniqueEntityID, status: string): Promise<Appointment>;
}
