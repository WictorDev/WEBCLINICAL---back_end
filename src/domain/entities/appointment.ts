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
} 