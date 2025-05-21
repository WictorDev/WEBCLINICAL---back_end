import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { Patient } from 'src/domain/entities/patient';
import { TypeRepository } from 'src/domain/repositories/type.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
export declare class CreatePatientUseCase {
    private readonly patientRepository;
    private readonly typeRepository;
    private readonly userRepository;
    constructor(patientRepository: PatientRepository, typeRepository: TypeRepository, userRepository: UserRepository);
    execute(data: {
        cpf: string;
        name: string;
        email: string;
        password: string;
        type: string;
    }): Promise<Patient>;
}
