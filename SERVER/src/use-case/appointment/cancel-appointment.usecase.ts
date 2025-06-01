import { Injectable, BadRequestException } from '@nestjs/common';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { UniqueEntityID } from '../../core/entities/unique-entity-id';

@Injectable()
export class CancelAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async execute(id: string): Promise<void> {
    const appointment = await this.appointmentRepository.findById(new UniqueEntityID(id));
    if (!appointment) {
      throw new BadRequestException('Agendamento não encontrado.');
    }

    if (appointment.status === 'CANCELADO') {
      throw new BadRequestException('Agendamento já está cancelado.');
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

    // Atualizar o status do agendamento
    await this.appointmentRepository.updateStatus(new UniqueEntityID(id), 'CANCELADO');

    // Liberar a agenda
    await this.scheduleRepository.update(schedule.id, {
      appointmentId: undefined
    });
  }
} 