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
            throw new Error("Empresa é obrigatória.");
        this.data.companyId = companyId;
    }
    get type() {
        return this.data.type;
    }
    set type(type) {
        if (!type)
            throw new Error("Tipo é obrigatório.");
        this.data.type = type;
    }
    get active() {
        return this.data.active;
    }
    set active(value) {
        this.data.active = value;
    }
    toJSON() {
        return {
            cpf: this.cpf.toString(),
            name: this.name,
            email: this.email,
            password: this.password,
            companyId: this.companyId,
            type: this.type,
            active: this.active
        };
    }
    static create(data) {
        const user = new User(data);
        return {
            cpf: user.cpf.toString(),
            name: user.name,
            email: user.email,
            password: user.password,
            companyId: user.companyId,
            type: user.type,
            active: user.active
        };
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map