import { Injectable } from "@nestjs/common";
import { PatientRepository } from "src/domain/repositories/patient.repository";
import { Patient } from "src/domain/entities/patient";
import UniqueEntityCpf from "src/core/entities/unique-entity-cpf";

@Injectable()
export class UpdatePatientUseCase {
    constructor(private readonly patientRepository: PatientRepository) { }

    async execute(cpf: UniqueEntityCpf, data: Partial<Patient>): Promise<Patient> {
        const patient = await this.patientRepository.findByCpf(cpf.toString());
        if (!patient) throw new Error('Paciente não encontrado');

        const updatedPatient = new Patient({
            cpf: new UniqueEntityCpf(patient.cpf),
            name: data.name || patient.name,
            email: data.email || patient.email,
            password: data.password || patient.password,
            typeId: data.typeId || patient.typeId,
            phoneNumber: data.phoneNumber || patient.phoneNumber,
        });

        return await this.patientRepository.update(cpf.toString(), updatedPatient);
    }
} 