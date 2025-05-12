export class MedicalRecord {
  constructor(
    public id: string,
    public symptoms: string,
    public diagnosis: string,
    public conduct: string,
    public createdAt: Date,
    public appointmentId: string,
  ) {}
} 