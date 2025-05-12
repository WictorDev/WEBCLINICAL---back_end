import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment';

export class FindEmployeeAppointmentsUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(employeeId: string, date?: Date): Promise<Appointment[]> {
    return this.appointmentRepository.findByEmployee(employeeId, date);
  }
} 