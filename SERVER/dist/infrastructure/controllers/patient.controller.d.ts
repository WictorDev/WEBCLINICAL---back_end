import { FindPatientUseCase } from 'src/use-case/patient/find-patient.usecase';
import { FindPatientByCpfUseCase } from 'src/use-case/patient/find-patient-by-cpf.usecase';
import { FindPatientByEmailUseCase } from 'src/use-case/patient/find-patient-by-email.usecase';
import { UpdatePatientUseCase } from 'src/use-case/patient/update-patient.usecase';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { CreatePatientUseCase } from 'src/use-case/patient/create-patient.usecase';
export declare class PatientController {
    private readonly typeRepository;
    private readonly createPatientUseCase;
    private readonly findPatientByCpfUseCase;
    private readonly findPatientByEmailUseCase;
    private readonly updatePatientUseCase;
    private readonly findAllPatientsUseCase;
    constructor(typeRepository: TypeRepository, createPatientUseCase: CreatePatientUseCase, findPatientByCpfUseCase: FindPatientByCpfUseCase, findPatientByEmailUseCase: FindPatientByEmailUseCase, updatePatientUseCase: UpdatePatientUseCase, findAllPatientsUseCase: FindPatientUseCase);
    findAll(): Promise<import("../../domain/entities/patient").Patient[]>;
    findByEmail(email: string): Promise<import("../../domain/entities/patient").Patient | null>;
    findByCpf(cpf: string): Promise<import("../../domain/entities/patient").Patient | null>;
    register(body: {
        cpf: string;
        name: string;
        email: string;
        password: string;
    }): Promise<import("../../domain/entities/patient").Patient>;
    update(cpf: string, data: {
        name?: string;
        email?: string;
        password?: string;
    }): Promise<import("../../domain/entities/patient").Patient>;
}
