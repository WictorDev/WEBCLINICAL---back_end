import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from 'src/domain/repositories/schedule.repository';

@Injectable()
export class FindScheduleByEmployeeUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async findAllByEmployee(employeeId: string) {
    return await this.scheduleRepository.findByEmployeeId(employeeId);
  }

  async findAvailableByEmployee(employeeId: string, active = true as const) {
    return await this.scheduleRepository.findAvailableByEmployeeId(employeeId, active);
  }
} 