"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEntityCpf = void 0;
class UniqueEntityCpf {
    value;
    constructor(value) {
        if (!this.isValidFormat(value)) {
            throw new Error('Formato de CPF inválido. Use 000.000.000-00');
        }
        if (!this.isValidCPF(value)) {
            throw new Error('CPF inválido.');
        }
        this.value = value;
    }
    toString() {
        return this.value;
    }
    isValidFormat(cpf) {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return cpfRegex.test(cpf);
    }
    isValidCPF(cpf) {
        const cleanCPF = cpf.replace(/\D/g, '');
        if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF))
            return false;
        let sum = 0, rest;
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cleanCPF[i - 1]) * (11 - i);
        }
        rest = (sum * 10) % 11;
        if (rest === 10 || rest === 11)
            rest = 0;
        if (rest !== parseInt(cleanCPF[9]))
            return false;
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cleanCPF[i - 1]) * (12 - i);
        }
        rest = (sum * 10) % 11;
        if (rest === 10 || rest === 11)
            rest = 0;
        return rest === parseInt(cleanCPF[10]);
    }
}
exports.UniqueEntityCpf = UniqueEntityCpf;
exports.default = UniqueEntityCpf;
//# sourceMappingURL=unique-entity-cpf.js.map