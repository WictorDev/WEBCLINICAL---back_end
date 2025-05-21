export class Prescription {
  constructor(
    public id: string,
    public medication: string,
    public dosage: string,
    public instructions: string,
    public medicalRecordId: string,
  ) {}

  static create(data: {
    id: string;
    medication: string;
    dosage: string;
    instructions: string;
    medicalRecordId: string;
  }) {
    return {
      id: data.id,
      medication: data.medication,
      dosage: data.dosage,
      instructions: data.instructions,
      medicalRecordId: data.medicalRecordId
    };
  }
} 