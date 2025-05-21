import { Schedule } from "../../domain/entities/schedule";
import { ScheduleRepository } from "../../domain/repositories/schedule.repository";

export class FindScheduleUseCase {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async findById(id: string): Promise<Schedule | null> {
    return await this.scheduleRepository.findById(id);
  }

  async findAll(): Promise<Schedule[]> {
    return await this.scheduleRepository.findAll();
  }

  async findByEmployeeId(employeeId: string): Promise<Schedule[]> {
    return await this.scheduleRepository.findByEmployeeId(employeeId);
  }

  async findAvailableByEmployeeId(employeeId: string, active = true as const): Promise<Schedule[]> {
    return await this.scheduleRepository.findAvailableByEmployeeId(employeeId, active);
  }

  async findByDate(employeeId: string, date: Date): Promise<Schedule[]> {
    return await this.scheduleRepository.findByDate(employeeId, date);
  }

  async findAvailableByDate(employeeId: string, date: Date, active = true as const): Promise<Schedule[]> {
    return await this.scheduleRepository.findAvailableByDate(employeeId, date, active);
  }
} 