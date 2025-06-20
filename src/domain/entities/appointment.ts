export enum AppointmentStatus {
  AVAILABLE = 'AVAILABLE',
  SCHEDULED = 'SCHEDULED',
  FINISHED = 'FINISHED'
}

export interface AppointmentData {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  scheduleId: string;
  patientId?: string | null;
  employeeId: string;
}

export class Appointment {
  constructor(private data: AppointmentData) {}

  get id(): string {
    return this.data.id;
  }

  get date(): Date {
    return this.data.date;
  }

  set date(date: Date) {
    if (!date) throw new Error("Data é obrigatória.");
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

  get status(): AppointmentStatus {
    return this.data.status;
  }

  set status(status: AppointmentStatus) {
    if (!status) throw new Error("Status é obrigatório.");
    if (!Object.values(AppointmentStatus).includes(status)) {
      throw new Error(`Status inválido. Use um dos seguintes: ${Object.values(AppointmentStatus).join(', ')}`);
    }
    this.data.status = status;
  }

  get scheduleId(): string {
    return this.data.scheduleId;
  }

  set scheduleId(scheduleId: string) {
    if (!scheduleId) throw new Error("ID da agenda é obrigatório.");
    this.data.scheduleId = scheduleId;
  }

  get patientId(): string | undefined | null {
    return this.data.patientId;
  }

  set patientId(patientId: string | undefined | null) {
    this.data.patientId = patientId;
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
      date: this.date,
      startTime: this.startTime,
      endTime: this.endTime,
      status: this.status,
      scheduleId: this.scheduleId,
      patientId: this.patientId,
      employeeId: this.employeeId
    };
  }

  static create(data: AppointmentData) {
    return {
      id: data.id,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      status: data.status,
      scheduleId: data.scheduleId,
      patientId: data.patientId,
      employeeId: data.employeeId
    };
  }
}

export interface AppointmentWithPatient {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  scheduleId: string;
  patientId?: string | null;
  employeeId: string;
  patient?: { name: string };
} 