"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    _id;
    props;
    get id() {
        return this._id;
    }
    constructor(Data) {
        this.props = Data;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map