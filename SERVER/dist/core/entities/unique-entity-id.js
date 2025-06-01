"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEntityID = void 0;
const node_crypto_1 = require("node:crypto");
class UniqueEntityID {
    value;
    toString() {
        return this.value;
    }
    constructor(value) {
        this.value = value ?? (0, node_crypto_1.randomUUID)();
    }
}
exports.UniqueEntityID = UniqueEntityID;
//# sourceMappingURL=unique-entity-id.js.map