import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment, AppointmentStatus, AppointmentWithPatient } from '../../domain/entities/appointment';

@Injectable()
export class FindEmployeeAppointmentsUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async execute(employeeId: string, date?: Date): Promise<Appointment[]> {
    return this.appointmentRepository.findByEmployee(employeeId, date);
  }

  async executeByScheduleIdAndStatus(scheduleId: string, status: AppointmentStatus): Promise<Appointment[]> {
    return this.appointmentRepository.findByScheduleIdAndStatus(scheduleId, status);
  }

  async executeByEmployeeAndSchedule(employeeId: string, scheduleId: string): Promise<AppointmentWithPatient[]> {
    return this.appointmentRepository.findByEmployeeAndSchedule(employeeId, scheduleId);
  }
} 