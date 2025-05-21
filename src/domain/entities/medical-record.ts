export class MedicalRecord {
  constructor(
    public id: string,
    public symptoms: string,
    public diagnosis: string,
    public conduct: string,
    public createdAt: Date,
    public appointmentId: string,
  ) {}

  static create(data: {
    id: string;
    symptoms: string;
    diagnosis: string;
    conduct: string;
    createdAt: Date;
    appointmentId: string;
  }) {
    return {
      id: data.id,
      symptoms: data.symptoms,
      diagnosis: data.diagnosis,
      conduct: data.conduct,
      createdAt: data.createdAt,
      appointmentId: data.appointmentId
    };
  }
} 