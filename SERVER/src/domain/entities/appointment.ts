export class Appointment {
  constructor(
    public id: string,
    public date: Date,
    public startTime: string,
    public endTime: string,
    public status: string,
    public scheduleId: string,
    public patientId: string,
    public employeeId: string,
  ) {}

  static create(data: {
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
    status: string;
    scheduleId: string;
    patientId: string;
    employeeId: string;
  }) {
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