import { PrismaService } from '../../../core/services/prisma.service';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { Appointment } from '../../../domain/entities/appointment';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
export declare class PrismaAppointmentRepository implements AppointmentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: UniqueEntityID): Promise<Appointment | null>;
    update(id: UniqueEntityID, data: Partial<Appointment>): Promise<Appointment>;
    findByPatient(patientId: string): Promise<Appointment[]>;
    findByEmployee(employeeId: string, date?: Date): Promise<Appointment[]>;
    create(appointment: Appointment): Promise<Appointment>;
    updateStatus(id: UniqueEntityID, status: string): Promise<Appointment>;
}
