import { Injectable, BadRequestException } from '@nestjs/common';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { AppointmentStatus } from '../../domain/entities/appointment';

@Injectable()
export class CancelAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async execute(id: string): Promise<void> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new BadRequestException('Agendamento não encontrado.');
    }

    if (appointment.status === AppointmentStatus.AVAILABLE) {
      throw new BadRequestException('Agendamento já está disponível.');
    }

    // Verificar se o scheduleId existe
    if (!appointment.scheduleId) {
      throw new BadRequestException('Agenda não encontrada para este agendamento.');
    }

    // Buscar a agenda
    const schedule = await this.scheduleRepository.findById(appointment.scheduleId);
    if (!schedule) {
      throw new BadRequestException('Agenda não encontrada.');
    }

    // Atualizar o status do agendamento para AVAILABLE e remover o paciente
    await this.appointmentRepository.update(id, {
      status: AppointmentStatus.AVAILABLE,
      patientId: null
    });
  }
} 