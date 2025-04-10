"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEntityCpf = void 0;
class UniqueEntityCpf {
    value;
    constructor(value) {
        const cleanCPF = value.replace(/\D/g, '');
        if (!this.isValidFormat(cleanCPF)) {
            throw new Error('Formato de CPF inválido. Deve conter 11 dígitos numéricos.');
        }
        if (!this.isValidCPF(cleanCPF)) {
            throw new Error('CPF inválido.');
        }
        this.value = cleanCPF;
    }
    toString() {
        return this.value;
    }
    isValidFormat(cpf) {
        return /^\d{11}$/.test(cpf);
    }
    isValidCPF(cpf) {
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf))
            return false;
        let sum = 0;
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf[i - 1]) * (11 - i);
        }
        let rest = (sum * 10) % 11;
        if (rest === 10 || rest === 11)
            rest = 0;
        if (rest !== parseInt(cpf[9]))
            return false;
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf[i - 1]) * (12 - i);
        }
        rest = (sum * 10) % 11;
        if (rest === 10 || rest === 11)
            rest = 0;
        return rest === parseInt(cpf[10]);
    }
}
exports.UniqueEntityCpf = UniqueEntityCpf;
exports.default = UniqueEntityCpf;
//# sourceMappingURL=unique-entity-cpf.js.map