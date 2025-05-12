import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Schedule } from '../../domain/entities/schedule';

export class FindAvailableSchedulesUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(employeeId: string, dayOfWeek: number): Promise<Schedule[]> {
    return this.scheduleRepository.findAvailableByEmployee(employeeId, dayOfWeek);
  }
} 