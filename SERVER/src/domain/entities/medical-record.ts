export interface MedicalRecordData {
  id: string;
  symptoms: string;
  diagnosis: string;
  conduct: string;
  createdAt: Date;
  appointmentId: string;
}

export class MedicalRecord {
  constructor(private data: MedicalRecordData) {}

  get id(): string {
    return this.data.id;
  }

  get symptoms(): string {
    return this.data.symptoms;
  }

  set symptoms(symptoms: string) {
    if (!symptoms) throw new Error("Sintomas são obrigatórios.");
    this.data.symptoms = symptoms;
  }

  get diagnosis(): string {
    return this.data.diagnosis;
  }

  set diagnosis(diagnosis: string) {
    if (!diagnosis) throw new Error("Diagnóstico é obrigatório.");
    this.data.diagnosis = diagnosis;
  }

  get conduct(): string {
    return this.data.conduct;
  }

  set conduct(conduct: string) {
    if (!conduct) throw new Error("Conduta é obrigatória.");
    this.data.conduct = conduct;
  }

  get createdAt(): Date {
    return this.data.createdAt;
  }

  get appointmentId(): string {
    return this.data.appointmentId;
  }

  set appointmentId(appointmentId: string) {
    if (!appointmentId) throw new Error("ID do agendamento é obrigatório.");
    this.data.appointmentId = appointmentId;
  }

  toJSON() {
    return {
      id: this.id,
      symptoms: this.symptoms,
      diagnosis: this.diagnosis,
      conduct: this.conduct,
      createdAt: this.createdAt,
      appointmentId: this.appointmentId
    };
  }

  static create(data: MedicalRecordData) {
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