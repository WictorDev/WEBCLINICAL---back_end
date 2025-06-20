"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneFormatter = void 0;
class PhoneFormatter {
    static format(phoneNumber) {
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        if (cleanNumber.length < 10 || cleanNumber.length > 11) {
            throw new Error("Telefone deve ter 10 ou 11 dígitos (incluindo DDD).");
        }
        if (cleanNumber.length === 11) {
            return `(${cleanNumber.slice(0, 2)}) ${cleanNumber.slice(2, 7)}-${cleanNumber.slice(7)}`;
        }
        else {
            return `(${cleanNumber.slice(0, 2)}) ${cleanNumber.slice(2, 6)}-${cleanNumber.slice(6)}`;
        }
    }
    static unformat(formattedPhone) {
        return formattedPhone.replace(/\D/g, '');
    }
    static isValid(phoneNumber) {
        try {
            const cleanNumber = phoneNumber.replace(/\D/g, '');
            return cleanNumber.length >= 10 && cleanNumber.length <= 11;
        }
        catch {
            return false;
        }
    }
}
exports.PhoneFormatter = PhoneFormatter;
//# sourceMappingURL=phone-formatter.js.map