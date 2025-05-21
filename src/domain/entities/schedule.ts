export class Schedule {
  constructor(
    public id: string,
    public dayOfWeek: number,
    public startTime: string,
    public endTime: string,
    public employeeId: string,
  ) {}

  static create(data: {
    id: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    employeeId: string;
  }) {
    return {
      id: data.id,
      dayOfWeek: data.dayOfWeek,
      startTime: data.startTime,
      endTime: data.endTime,
      employeeId: data.employeeId
    };
  }
} 