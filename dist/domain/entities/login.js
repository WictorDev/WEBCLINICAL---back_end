"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Login {
    identifier;
    password;
    isPatient;
    tipo;
    constructor(props) {
        this.identifier = props.identifier;
        this.password = props.password;
        this.isPatient = props.isPatient || false;
        this.tipo = props.tipo;
    }
}
exports.default = Login;
//# sourceMappingURL=login.js.map