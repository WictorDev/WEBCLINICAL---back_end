export class Prescription {
  constructor(
    public id: string,
    public medication: string,
    public dosage: string,
    public instructions: string,
    public medicalRecordId: string,
  ) {}
} 