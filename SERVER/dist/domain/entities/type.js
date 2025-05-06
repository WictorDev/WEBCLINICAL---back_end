"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
class Type {
    data;
    constructor(data) {
        this.data = data;
    }
    get id() {
        return this.data.id;
    }
    get name() {
        return this.data.name;
    }
    set name(name) {
        if (!name)
            throw new Error("Nome do tipo é obrigatório.");
        this.data.name = name;
    }
}
exports.Type = Type;
//# sourceMappingURL=type.js.map