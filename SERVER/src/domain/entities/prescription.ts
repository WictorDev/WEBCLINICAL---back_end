export interface PrescriptionData {
  id: string;
  medication: string;
  dosage: string;
  instructions: string;
  medicalRecordId: string;
}

export class Prescription {
  constructor(private data: PrescriptionData) {}

  get id(): string {
    return this.data.id;
  }

  get medication(): string {
    return this.data.medication;
  }

  set medication(medication: string) {
    if (!medication) throw new Error("Medicação é obrigatória.");
    this.data.medication = medication;
  }

  get dosage(): string {
    return this.data.dosage;
  }

  set dosage(dosage: string) {
    if (!dosage) throw new Error("Dosagem é obrigatória.");
    this.data.dosage = dosage;
  }

  get instructions(): string {
    return this.data.instructions;
  }

  set instructions(instructions: string) {
    if (!instructions) throw new Error("Instruções são obrigatórias.");
    this.data.instructions = instructions;
  }

  get medicalRecordId(): string {
    return this.data.medicalRecordId;
  }

  set medicalRecordId(medicalRecordId: string) {
    if (!medicalRecordId) throw new Error("ID do prontuário é obrigatório.");
    this.data.medicalRecordId = medicalRecordId;
  }

  toJSON() {
    return {
      id: this.id,
      medication: this.medication,
      dosage: this.dosage,
      instructions: this.instructions,
      medicalRecordId: this.medicalRecordId
    };
  }

  static create(data: PrescriptionData) {
    return {
      id: data.id,
      medication: data.medication,
      dosage: data.dosage,
      instructions: data.instructions,
      medicalRecordId: data.medicalRecordId
    };
  }
} 