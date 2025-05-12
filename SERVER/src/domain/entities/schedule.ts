export class Schedule {
  constructor(
    public id: string,
    public dayOfWeek: number,
    public startTime: string,
    public endTime: string,
    public employeeId: string,
  ) {}
} 