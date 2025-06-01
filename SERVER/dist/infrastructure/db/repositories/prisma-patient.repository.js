"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPatientRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/services/prisma.service");
const patient_1 = require("../../../domain/entities/patient");
const library_1 = require("@prisma/client/runtime/library");
const unique_entity_cpf_1 = require("../../../core/entities/unique-entity-cpf");
let PrismaPatientRepository = class PrismaPatientRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(patient) {
        try {
            const created = await this.prismaService.patient.create({
                data: {
                    cpf: patient.cpf.toString(),
                    name: patient.name,
                    email: patient.email,
                    password: patient.password,
                    typeId: patient.typeId,
                },
            });
            return new patient_1.Patient({
                cpf: new unique_entity_cpf_1.UniqueEntityCpf(created.cpf),
                name: created.name,
                email: created.email,
                password: created.password,
                typeId: created.typeId,
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                const target = error.meta?.target;
                if (Array.isArray(target)) {
                    if (target.includes('cpf')) {
                        throw new common_1.ConflictException('CPF já cadastrado.');
                    }
                    else if (target.includes('email')) {
                        throw new common_1.ConflictException('Email já cadastrado.');
                    }
                }
                else if (typeof target === 'string') {
                    if (target.includes('cpf')) {
                        throw new common_1.ConflictException('CPF já cadastrado.');
                    }
                    else if (target.includes('email')) {
                        throw new common_1.ConflictException('Email já cadastrado.');
                    }
                }
                throw new common_1.ConflictException('Registro duplicado.');
            }
            throw error;
        }
    }
    async findAll() {
        const patients = await this.prismaService.patient.findMany();
        return patients.map((patient) => new patient_1.Patient({
            cpf: new unique_entity_cpf_1.UniqueEntityCpf(patient.cpf),
            name: patient.name,
            email: patient.email,
            password: patient.password,
            typeId: patient.typeId,
        }));
    }
    async findByCpf(cpf) {
        const patient = await this.prismaService.patient.findUnique({
            where: { cpf },
        });
        if (!patient)
            return null;
        return new patient_1.Patient({
            cpf: new unique_entity_cpf_1.UniqueEntityCpf(patient.cpf),
            name: patient.name,
            email: patient.email,
            password: patient.password,
            typeId: patient.typeId,
        });
    }
    async findByEmail(email) {
        const patient = await this.prismaService.patient.findUnique({
            where: { email },
        });
        if (!patient)
            return null;
        return new patient_1.Patient({
            cpf: new unique_entity_cpf_1.UniqueEntityCpf(patient.cpf),
            name: patient.name,
            email: patient.email,
            password: patient.password,
            typeId: patient.typeId,
        });
    }
    async update(cpf, data) {
        const updated = await this.prismaService.patient.update({
            where: { cpf },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                typeId: data.typeId,
            },
        });
        return new patient_1.Patient({
            cpf: new unique_entity_cpf_1.UniqueEntityCpf(updated.cpf),
            name: updated.name,
            email: updated.email,
            password: updated.password,
            typeId: updated.typeId,
        });
    }
};
exports.PrismaPatientRepository = PrismaPatientRepository;
exports.PrismaPatientRepository = PrismaPatientRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaPatientRepository);
//# sourceMappingURL=prisma-patient.repository.js.map