import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment, AppointmentStatus } from '../../domain/entities/appointment';

@Injectable()
export class UpdateAppointmentPatientUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(id: string, patientId: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    // Verificar se o paciente já tem appointment na mesma data
    const patientAppointments = await this.appointmentRepository.findByPatientAndDate(
      patientId,
      appointment.date
    );
    
    // Excluir o appointment atual da verificação (se for o mesmo)
    const otherAppointments = patientAppointments.filter(a => a.id !== id);
    
    if (otherAppointments.length > 0) {
      throw new BadRequestException('Você já possui um agendamento nesta data.');
    }

    appointment.patientId = patientId;
    appointment.status = AppointmentStatus.SCHEDULED;
    
    return this.appointmentRepository.update(id, { 
      patientId,
      status: AppointmentStatus.SCHEDULED
    });
  }
} 