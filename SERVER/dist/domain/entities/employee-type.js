"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeType = void 0;
class EmployeeType {
    data;
    constructor(data) {
        this.data = data;
    }
    get id() {
        return this.data.id;
    }
    set id(id) {
        if (!id)
            throw new Error("ID é obrigatório.");
        this.data.id = id;
    }
    get name() {
        return this.data.name;
    }
    set name(name) {
        if (!name)
            throw new Error("Nome é obrigatório.");
        this.data.name = name;
    }
}
exports.EmployeeType = EmployeeType;
//# sourceMappingURL=employee-type.js.map