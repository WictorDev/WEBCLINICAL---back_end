import { CreateAppointmentUseCase } from '../../use-case/appointment/create-appointment.usecase';
import { FindEmployeeAppointmentsUseCase } from '../../use-case/appointment/find-employee-appointments.usecase';
import { FinalizeAppointmentUseCase } from '../../use-case/appointment/finalize-appointment.usecase';
import { UpdateAppointmentStatusUseCase } from '../../use-case/appointment/update-appointment-status.usecase';
import { UpdateAppointmentPatientUseCase } from '../../use-case/appointment/update-appointment-patient.usecase';
import { CancelAppointmentUseCase } from '../../use-case/appointment/cancel-appointment.usecase';
import { Appointment, AppointmentStatus } from '../../domain/entities/appointment';
import { MedicalRecord } from '../../domain/entities/medical-record';
import { FindPatientAppointmentsUseCase } from '../../use-case/appointment/find-patient-appointments.usecase';
export declare class AppointmentController {
    private readonly createAppointment;
    private readonly findEmployeeAppointments;
    private readonly finalizeAppointment;
    private readonly updateAppointmentStatus;
    private readonly updateAppointmentPatient;
    private readonly cancelAppointment;
    private readonly findPatientAppointments;
    constructor(createAppointment: CreateAppointmentUseCase, findEmployeeAppointments: FindEmployeeAppointmentsUseCase, finalizeAppointment: FinalizeAppointmentUseCase, updateAppointmentStatus: UpdateAppointmentStatusUseCase, updateAppointmentPatient: UpdateAppointmentPatientUseCase, cancelAppointment: CancelAppointmentUseCase, findPatientAppointments: FindPatientAppointmentsUseCase);
    create(body: Omit<Appointment, 'id'>): Promise<Appointment>;
    getAllByEmployee(employeeId: string): Promise<Appointment[]>;
    getAllByEmployeeAndSchedule(employeeId: string, scheduleId: string): Promise<import("../../domain/entities/appointment").AppointmentWithPatient[]>;
    getByEmployee(employeeId: string, date?: string): Promise<Appointment[]>;
    finalizeAppointmentRecord(id: string, medicalRecordData: Omit<MedicalRecord, 'id' | 'createdAt'>): Promise<MedicalRecord>;
    updateStatus(id: string, body: {
        status: AppointmentStatus;
    }): Promise<Appointment>;
    updatePatient(id: string, body: {
        patientId: string;
    }): Promise<Appointment>;
    getByPatient(patientId: string): Promise<Appointment[]>;
    getAvailableBySchedule(scheduleId: string): Promise<Appointment[]>;
    getMyAppointments(req: any): Promise<Appointment[]>;
    cancel(id: string): Promise<void>;
}
