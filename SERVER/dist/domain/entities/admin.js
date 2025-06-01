"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const unique_entity_cpf_1 = require("../../core/entities/unique-entity-cpf");
class Admin {
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
    get type() {
        return this.data.type;
    }
    set type(type) {
        if (!type)
            throw new Error("Tipo é obrigatório.");
        this.data.type = type;
    }
    toJSON() {
        return {
            cpf: this.cpf.toString(),
            name: this.name,
            type: this.type,
        };
    }
    static create(data) {
        return {
            cpf: data.cpf.toString(),
            name: data.name,
            type: data.type,
        };
    }
}
exports.Admin = Admin;
//# sourceMappingURL=admin.js.map