"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEntityCnpj = void 0;
class UniqueEntityCnpj {
    value;
    constructor(value) {
        const cleanCNPJ = value.replace(/\D/g, '');
        if (!this.isValidFormat(cleanCNPJ)) {
            throw new Error('Formato de CNPJ inválido. Deve conter 14 dígitos numéricos.');
        }
        if (!this.isValidCNPJ(cleanCNPJ)) {
            throw new Error('CNPJ inválido.');
        }
        this.value = cleanCNPJ;
    }
    toString() {
        return this.value;
    }
    isValidFormat(cnpj) {
        return /^\d{14}$/.test(cnpj);
    }
    isValidCNPJ(cnpj) {
        if (/^(\d)\1{13}$/.test(cnpj))
            return false;
        const calcCheckDigit = (cnpj, length) => {
            const weights = length === 12
                ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
                : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            const sum = cnpj
                .slice(0, length)
                .split('')
                .reduce((acc, digit, index) => acc + parseInt(digit) * weights[index], 0);
            const remainder = sum % 11;
            return remainder < 2 ? 0 : 11 - remainder;
        };
        const digit1 = calcCheckDigit(cnpj, 12);
        const digit2 = calcCheckDigit(cnpj, 13);
        return digit1 === parseInt(cnpj[12]) && digit2 === parseInt(cnpj[13]);
    }
}
exports.UniqueEntityCnpj = UniqueEntityCnpj;
exports.default = UniqueEntityCnpj;
//# sourceMappingURL=unique-entity-cnpj.js.map