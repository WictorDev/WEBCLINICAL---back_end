export interface ScheduleData {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  employeeId: string;
}

export class Schedule {
  constructor(private data: ScheduleData) {}

  get id(): string {
    return this.data.id;
  }

  get dayOfWeek(): number {
    return this.data.dayOfWeek;
  }

  set dayOfWeek(dayOfWeek: number) {
    if (dayOfWeek < 0 || dayOfWeek > 6) throw new Error("Dia da semana inválido.");
    this.data.dayOfWeek = dayOfWeek;
  }

  get startTime(): string {
    return this.data.startTime;
  }

  set startTime(startTime: string) {
    if (!startTime) throw new Error("Horário de início é obrigatório.");
    this.data.startTime = startTime;
  }

  get endTime(): string {
    return this.data.endTime;
  }

  set endTime(endTime: string) {
    if (!endTime) throw new Error("Horário de término é obrigatório.");
    this.data.endTime = endTime;
  }

  get employeeId(): string {
    return this.data.employeeId;
  }

  set employeeId(employeeId: string) {
    if (!employeeId) throw new Error("ID do funcionário é obrigatório.");
    this.data.employeeId = employeeId;
  }

  toJSON() {
    return {
      id: this.id,
      dayOfWeek: this.dayOfWeek,
      startTime: this.startTime,
      endTime: this.endTime,
      employeeId: this.employeeId
    };
  }

  static create(data: ScheduleData) {
    return {
      id: data.id,
      dayOfWeek: data.dayOfWeek,
      startTime: data.startTime,
      endTime: data.endTime,
      employeeId: data.employeeId
    };
  }
} 