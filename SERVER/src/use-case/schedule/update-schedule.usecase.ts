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

export class UpdateScheduleUseCase {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(data: UpdateScheduleUseCaseRequest): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findById(data.id);

    if (!schedule) {
      throw new Error("Agenda não encontrada");
    }

    return await this.scheduleRepository.update(data.id, data);
  }
} 