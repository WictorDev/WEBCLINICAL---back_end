"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const unique_entity_cpf_1 = require("../../core/entities/unique-entity-cpf");
class Patient {
    data;
    constructor(data) {
        this.data = data;
    }
    get cpf() {
        return this.data.cpf.toString();
    }
    set cpf(cpf) {
        if (!cpf)
            throw new Error("CPF é obrigatório.");
        this.data.cpf = new unique_entity_cpf_1.default(cpf.toString());
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
        this.data.email = email;
    }
    get password() {
        return this.data.password;
    }
    set password(password) {
        if (!password)
            throw new Error("Senha é obrigatório.");
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
}
exports.Patient = Patient;
//# sourceMappingURL=patient.js.map