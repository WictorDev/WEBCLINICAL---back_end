import { AppointmentRepository } from 'src/domain/repositories/appointment.repository';
import { Appointment } from 'src/domain/entities/appointment';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
export declare class UpdateAppointmentUseCase {
    private readonly appointmentRepository;
    constructor(appointmentRepository: AppointmentRepository);
    execute(id: UniqueEntityID, data: Partial<Appointment>): Promise<Appointment>;
}
