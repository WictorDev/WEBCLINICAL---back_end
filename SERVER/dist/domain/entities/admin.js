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
    get typeId() {
        return this.data.typeId;
    }
    set typeId(typeId) {
        if (!typeId)
            throw new Error("ID do Tipo é obrigatório.");
        this.data.typeId = typeId;
    }
}
exports.Admin = Admin;
//# sourceMappingURL=admin.js.map