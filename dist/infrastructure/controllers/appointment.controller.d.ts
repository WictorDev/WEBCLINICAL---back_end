import { CreateAppointmentUseCase } from '../../use-case/appointment/create-appointment.usecase';
import { FindEmployeeAppointmentsUseCase } from '../../use-case/appointment/find-employee-appointments.usecase';
import { FinalizeAppointmentUseCase } from '../../use-case/appointment/finalize-appointment.usecase';
import { UpdateAppointmentStatusUseCase } from '../../use-case/appointment/update-appointment-status.usecase';
import { Appointment } from '../../domain/entities/appointment';
import { MedicalRecord } from '../../domain/entities/medical-record';
import { FindPatientAppointmentsUseCase } from '../../use-case/appointment/find-patient-appointments.usecase';
export declare class AppointmentController {
    private readonly createAppointment;
    private readonly findEmployeeAppointments;
    private readonly finalizeAppointment;
    private readonly updateAppointmentStatus;
    private readonly findPatientAppointments;
    constructor(createAppointment: CreateAppointmentUseCase, findEmployeeAppointments: FindEmployeeAppointmentsUseCase, finalizeAppointment: FinalizeAppointmentUseCase, updateAppointmentStatus: UpdateAppointmentStatusUseCase, findPatientAppointments: FindPatientAppointmentsUseCase);
    create(body: Omit<Appointment, 'id'>): Promise<Appointment>;
    getByEmployee(employeeId: string, date?: string): Promise<Appointment[]>;
    finalizeAppointmentRecord(id: string, medicalRecordData: Omit<MedicalRecord, 'id' | 'createdAt'>): Promise<MedicalRecord>;
    updateStatus(id: string, body: {
        status: string;
    }): Promise<Appointment>;
    getByPatient(patientId: string): Promise<Appointment[]>;
    getAvailableBySchedule(scheduleId: string): Promise<Appointment[]>;
}
