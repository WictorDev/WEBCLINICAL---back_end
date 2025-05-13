import { PrismaService } from '../../../core/services/prisma.service';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { Appointment } from '../../../domain/entities/appointment';
export declare class PrismaAppointmentRepository implements AppointmentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmployee(employeeId: string, date?: Date): Promise<Appointment[]>;
    findByPatient(patientId: string): Promise<Appointment[]>;
    create(appointment: Appointment): Promise<Appointment>;
    updateStatus(id: string, status: string): Promise<Appointment>;
}
