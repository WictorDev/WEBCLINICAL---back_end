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
exports.PrismaPrescriptionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/services/prisma.service");
const prescription_1 = require("../../../domain/entities/prescription");
let PrismaPrescriptionRepository = class PrismaPrescriptionRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByMedicalRecord(medicalRecordId) {
        const prescriptions = await this.prisma.prescription.findMany({ where: { medicalRecordId } });
        return prescriptions.map(p => new prescription_1.Prescription({
            id: p.id,
            medication: p.medication,
            dosage: p.dosage,
            instructions: p.instructions,
            medicalRecordId: p.medicalRecordId
        }));
    }
    async create(prescription) {
        const p = await this.prisma.prescription.create({
            data: {
                id: prescription.id,
                medication: prescription.medication,
                dosage: prescription.dosage,
                instructions: prescription.instructions,
                medicalRecordId: prescription.medicalRecordId,
            },
        });
        return new prescription_1.Prescription({
            id: p.id,
            medication: p.medication,
            dosage: p.dosage,
            instructions: p.instructions,
            medicalRecordId: p.medicalRecordId
        });
    }
};
exports.PrismaPrescriptionRepository = PrismaPrescriptionRepository;
exports.PrismaPrescriptionRepository = PrismaPrescriptionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaPrescriptionRepository);
//# sourceMappingURL=prisma-prescription.repository.js.map