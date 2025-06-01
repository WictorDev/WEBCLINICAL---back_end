"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const unique_entity_cnpj_1 = require("../../core/entities/unique-entity-cnpj");
class Company {
    data;
    constructor(data) {
        this.data = data;
    }
    get name() {
        return this.data.name;
    }
    set name(name) {
        if (!name)
            throw new Error("Nome da empresa é obrigatório.");
        this.data.name = name;
    }
    get cnpj() {
        return this.data.cnpj.toString();
    }
    set cnpj(cnpj) {
        if (!cnpj)
            throw new Error("CNPJ é obrigatório.");
        this.data.cnpj = new unique_entity_cnpj_1.UniqueEntityCnpj(cnpj);
    }
    get email() {
        return this.data.email;
    }
    set email(email) {
        if (!email)
            throw new Error("Email da empresa é obrigatório.");
        this.data.email = email;
    }
    get phone() {
        return this.data.phone;
    }
    set phone(phone) {
        if (!phone)
            throw new Error("Telefone da empresa é obrigatório.");
        this.data.phone = phone;
    }
    toJSON() {
        return {
            name: this.name,
            cnpj: this.cnpj,
            email: this.email,
            phone: this.phone
        };
    }
    static create(data) {
        return {
            name: data.name,
            cnpj: data.cnpj.toString(),
            email: data.email,
            phone: data.phone
        };
    }
}
exports.Company = Company;
//# sourceMappingURL=company.js.map