export interface ScheduleData {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration?: number;
  employeeId: string;
  active: boolean;
}

export class Schedule {
  constructor(private data: ScheduleData) {}

  get id(): string {
    return this.data.id;
  }

  get date(): Date {
    return this.data.date;
  }

  set date(date: Date) {
    if (!date) throw new Error("Data é obrigatória.");
    if (date < new Date()) throw new Error("Data não pode ser no passado.");
    this.data.date = date;
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

  get duration(): number | undefined {
    return this.data.duration;
  }

  set duration(duration: number | undefined) {
    if (duration !== undefined && duration <= 0) throw new Error("Duração deve ser maior que zero.");
    this.data.duration = duration;
  }

  get employeeId(): string {
    return this.data.employeeId;
  }

  set employeeId(employeeId: string) {
    if (!employeeId) throw new Error("ID do funcionário é obrigatório.");
    this.data.employeeId = employeeId;
  }

  get active(): boolean {
    return this.data.active;
  }

  set active(active: boolean) {
    this.data.active = active;
  }

  toJSON() {
    return {
      id: this.data.id,
      date: this.data.date,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      duration: this.data.duration,
      employeeId: this.data.employeeId,
      active: this.data.active
    };
  }

  static create(data: ScheduleData) {
    return {
      id: data.id,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      duration: data.duration,
      employeeId: data.employeeId,
      active: data.active
    };
  }
} 