"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const unique_entity_cpf_1 = require("../../core/entities/unique-entity-cpf");
class User {
    data;
    constructor(data) {
        this.data = data;
    }
    get cpf() {
        return this.data.cpf;
    }
    set cpf(cpf) {
        if (!cpf)
            throw new Error("CPF é obrigatório.");
        this.data.cpf = new unique_entity_cpf_1.default(cpf);
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
    get companyId() {
        return this.data.companyId;
    }
    set companyId(companyId) {
        if (!companyId)
            throw new Error("Empresa é obrigatório.");
        this.data.companyId = companyId;
    }
    get typeId() {
        return this.data.typeId;
    }
    set typeId(typeId) {
        this.data.typeId = typeId;
    }
    get active() {
        return this.data.active;
    }
    set active(value) {
        this.data.active = value;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map