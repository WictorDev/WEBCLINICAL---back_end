import { FinalizeAppointmentUseCase } from '../../use-case/appointment/finalize-appointment.usecase';
import { MedicalRecordRepository } from '../../domain/repositories/medical-record.repository';
import { MedicalRecord } from '../../domain/entities/medical-record';
export declare class MedicalRecordController {
    private readonly finalizeAppointment;
    private readonly medicalRecordRepository;
    constructor(finalizeAppointment: FinalizeAppointmentUseCase, medicalRecordRepository: MedicalRecordRepository);
    finalize(body: {
        appointmentId: string;
        symptoms: string;
        diagnosis: string;
        conduct: string;
    }): Promise<MedicalRecord>;
    getByAppointment(appointmentId: string): Promise<MedicalRecord | null>;
}
