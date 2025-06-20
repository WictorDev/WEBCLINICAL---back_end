import { FindPatientUseCase } from 'src/use-case/patient/find-patient.usecase';
import { FindPatientByCpfUseCase } from 'src/use-case/patient/find-patient-by-cpf.usecase';
import { FindPatientByEmailUseCase } from 'src/use-case/patient/find-patient-by-email.usecase';
import { UpdatePatientUseCase } from 'src/use-case/patient/update-patient.usecase';
import { CreatePatientUseCase } from 'src/use-case/patient/create-patient.usecase';
import { RecoveryPasswordUseCase } from 'src/use-case/patient/recovery-password.usecase';
import { ConfirmPatientRegistrationUseCase } from 'src/use-case/patient/confirm-patient-registration.usecase';
export declare class PatientController {
    private readonly createPatientUseCase;
    private readonly findPatientByCpfUseCase;
    private readonly findPatientByEmailUseCase;
    private readonly updatePatientUseCase;
    private readonly findAllPatientsUseCase;
    private readonly recoveryPasswordUseCase;
    private readonly confirmPatientRegistrationUseCase;
    constructor(createPatientUseCase: CreatePatientUseCase, findPatientByCpfUseCase: FindPatientByCpfUseCase, findPatientByEmailUseCase: FindPatientByEmailUseCase, updatePatientUseCase: UpdatePatientUseCase, findAllPatientsUseCase: FindPatientUseCase, recoveryPasswordUseCase: RecoveryPasswordUseCase, confirmPatientRegistrationUseCase: ConfirmPatientRegistrationUseCase);
    findAll(): Promise<import("../../domain/entities/patient").Patient[]>;
    findByEmail(email: string): Promise<import("../../domain/entities/patient").Patient | null>;
    findByCpf(cpf: string): Promise<import("../../domain/entities/patient").Patient | null>;
    register(body: {
        cpf: string;
        name: string;
        email: string;
        password: string;
        phoneNumber: string;
    }): Promise<{
        message: string;
    }>;
    confirmRegistration(body: {
        token: string;
    }): Promise<{
        message: string;
        patient: {
            cpf: string;
            name: string;
            email: string;
            phoneNumber: string;
        };
    }>;
    update(cpf: string, data: {
        name?: string;
        email?: string;
        password?: string;
        phoneNumber?: string;
    }): Promise<import("../../domain/entities/patient").Patient>;
    recoveryPassword(email: string, data: {
        password: string;
    }): Promise<void>;
}
