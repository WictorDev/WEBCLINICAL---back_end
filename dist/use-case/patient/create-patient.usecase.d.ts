import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { Patient } from 'src/domain/entities/patient';
import { TypeRepository } from 'src/domain/repositories/type.repository';
export declare class CreatePatientUseCase {
    private readonly patientRepository;
    private readonly typeRepository;
    constructor(patientRepository: PatientRepository, typeRepository: TypeRepository);
    execute(data: {
        cpf: string;
        name: string;
        email: string;
        password: string;
    }): Promise<Patient>;
}
