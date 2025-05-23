import { Injectable, NotFoundException } from '@nestjs/common';
import { Schedule } from "../../domain/entities/schedule";
import { ScheduleRepository } from "../../domain/repositories/schedule.repository";

interface UpdateScheduleUseCaseRequest {
  id: string;
  date?: Date;
  startTime?: string;
  endTime?: string;
  duration?: number;
  totalSlots?: number;
  availableSlots?: number;
  employeeId?: string;
  active?: boolean;
}

@Injectable()
export class UpdateScheduleUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(data: UpdateScheduleUseCaseRequest): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findById(data.id);

    if (!schedule) {
      throw new NotFoundException('Agenda não encontrada.');
    }

    const updatedSchedule = new Schedule({
      id: schedule.id,
      date: data.date ?? schedule.date,
      startTime: data.startTime ?? schedule.startTime,
      endTime: data.endTime ?? schedule.endTime,
      duration: data.duration ?? schedule.duration,
      totalSlots: data.totalSlots ?? schedule.totalSlots,
      availableSlots: data.availableSlots ?? schedule.availableSlots,
      employeeId: data.employeeId ?? schedule.employeeId,
      active: data.active ?? schedule.active
    });

    return this.scheduleRepository.update(data.id, updatedSchedule);
  }
} 