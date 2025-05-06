import { CreatePatientUseCase } from 'src/use-case/patient/create-patient.usecase';
import { FindPatientUseCase } from 'src/use-case/patient/find-patient.usecase';
import { FindPatientByCpfUseCase } from 'src/use-case/patient/find-patient-by-cpf.usecase';
import { FindPatientByEmailUseCase } from 'src/use-case/patient/find-patient-by-email.usecase';
export declare class PatientController {
    private readonly createPatientUseCase;
    private readonly findPatientUseCase;
    private readonly findPatientByCpfUseCase;
    private readonly findPatientByEmailUseCase;
    constructor(createPatientUseCase: CreatePatientUseCase, findPatientUseCase: FindPatientUseCase, findPatientByCpfUseCase: FindPatientByCpfUseCase, findPatientByEmailUseCase: FindPatientByEmailUseCase);
    findAll(): Promise<import("../../domain/entities/patient").Patient[]>;
    findByEmail(email: string): Promise<import("../../domain/entities/patient").Patient | null>;
    findByCpf(cpf: string): Promise<import("../../domain/entities/patient").Patient | null>;
    register(body: {
        cpf: string;
        name: string;
        email: string;
        password: string;
    }): Promise<import("../../domain/entities/patient").Patient>;
}
