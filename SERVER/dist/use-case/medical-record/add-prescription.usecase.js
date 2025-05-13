"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPrescriptionUseCase = void 0;
class AddPrescriptionUseCase {
    prescriptionRepository;
    constructor(prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }
    async execute(medicalRecordId, prescriptions) {
        const created = [];
        for (const p of prescriptions) {
            const prescription = await this.prescriptionRepository.create({
                ...p,
                id: '',
                medicalRecordId,
            });
            created.push(prescription);
        }
        return created;
    }
}
exports.AddPrescriptionUseCase = AddPrescriptionUseCase;
//# sourceMappingURL=add-prescription.usecase.js.map