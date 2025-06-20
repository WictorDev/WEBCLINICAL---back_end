import { PrismaService } from '../../../core/services/prisma.service';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { Appointment, AppointmentStatus, AppointmentWithPatient } from '../../../domain/entities/appointment';
export declare class PrismaAppointmentRepository implements AppointmentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<Appointment | null>;
    update(id: string, data: Partial<Appointment>): Promise<Appointment>;
    findByPatient(patientId: string): Promise<any[]>;
    findByPatientAndDate(patientId: string, date: Date): Promise<Appointment[]>;
    findByEmployee(employeeId: string, date?: Date): Promise<Appointment[]>;
    create(appointment: Appointment): Promise<Appointment>;
    updateStatus(id: string, status: AppointmentStatus): Promise<Appointment>;
    findByScheduleIdAndStatus(scheduleId: string, status: AppointmentStatus): Promise<Appointment[]>;
    findByEmployeeAndSchedule(employeeId: string, scheduleId: string): Promise<AppointmentWithPatient[]>;
}
