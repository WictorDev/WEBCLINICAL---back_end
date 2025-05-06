"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Login {
    identifier;
    password;
    isPatient;
    constructor(props) {
        this.identifier = props.identifier;
        this.password = props.password;
        this.isPatient = props.isPatient || false;
    }
}
exports.default = Login;
//# sourceMappingURL=login.js.map