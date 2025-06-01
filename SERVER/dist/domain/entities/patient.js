"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
class Patient {
    data;
    constructor(data) {
        this.data = data;
    }
    get cpf() {
        return this.data.cpf.toString();
    }
    get name() {
        return this.data.name;
    }
    set name(name) {
        if (!name)
            throw new Error("Nome é obrigatório.");
        this.data.name = name;
    }
    get email() {
        return this.data.email;
    }
    set email(email) {
        if (!email)
            throw new Error("Email é obrigatório.");
        if (!email.includes('@'))
            throw new Error("Email inválido.");
        this.data.email = email;
    }
    get password() {
        return this.data.password;
    }
    set password(password) {
        if (!password)
            throw new Error("Senha é obrigatória.");
        if (password.length < 6)
            throw new Error("Senha deve ter no mínimo 6 caracteres.");
        this.data.password = password;
    }
    get typeId() {
        return this.data.typeId;
    }
    set typeId(typeId) {
        if (!typeId)
            throw new Error("Tipo é obrigatório.");
        this.data.typeId = typeId;
    }
    toJSON() {
        return {
            cpf: this.cpf,
            name: this.name,
            email: this.email,
            typeId: this.typeId
        };
    }
    static create(data) {
        return {
            cpf: data.cpf.toString(),
            name: data.name,
            email: data.email,
            password: data.password,
            typeId: data.typeId
        };
    }
}
exports.Patient = Patient;
//# sourceMappingURL=patient.js.map