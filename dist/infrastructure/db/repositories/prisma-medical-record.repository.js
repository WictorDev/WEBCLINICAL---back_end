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
exports.PrismaMedicalRecordRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/services/prisma.service");
const medical_record_1 = require("../../../domain/entities/medical-record");
let PrismaMedicalRecordRepository = class PrismaMedicalRecordRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByAppointment(appointmentId) {
        const record = await this.prisma.medicalRecord.findUnique({ where: { appointmentId } });
        if (!record)
            return null;
        return new medical_record_1.MedicalRecord({
            id: record.id,
            symptoms: record.symptoms,
            diagnosis: record.diagnosis,
            conduct: record.conduct,
            createdAt: record.createdAt,
            appointmentId: record.appointmentId
        });
    }
    async create(medicalRecord) {
        const r = await this.prisma.medicalRecord.create({
            data: {
                id: medicalRecord.id,
                symptoms: medicalRecord.symptoms,
                diagnosis: medicalRecord.diagnosis,
                conduct: medicalRecord.conduct,
                createdAt: medicalRecord.createdAt,
                appointmentId: medicalRecord.appointmentId,
            },
        });
        return new medical_record_1.MedicalRecord({
            id: r.id,
            symptoms: r.symptoms,
            diagnosis: r.diagnosis,
            conduct: r.conduct,
            createdAt: r.createdAt,
            appointmentId: r.appointmentId
        });
    }
};
exports.PrismaMedicalRecordRepository = PrismaMedicalRecordRepository;
exports.PrismaMedicalRecordRepository = PrismaMedicalRecordRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaMedicalRecordRepository);
//# sourceMappingURL=prisma-medical-record.repository.js.map