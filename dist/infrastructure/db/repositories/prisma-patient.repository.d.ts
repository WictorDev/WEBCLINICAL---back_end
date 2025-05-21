import { PrismaService } from 'src/core/services/prisma.service';
import { Patient } from 'src/domain/entities/patient';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
export declare class PrismaPatientRepository implements PatientRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(patient: Patient): Promise<Patient>;
    findAll(): Promise<Patient[]>;
    findByCpf(cpf: string): Promise<Patient | null>;
    findByEmail(email: string): Promise<Patient | null>;
    update(cpf: string, patient: Patient): Promise<Patient>;
}
