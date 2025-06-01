"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponse = exports.Login = void 0;
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
exports.Login = Login;
class LoginResponse {
    token;
    tipo;
    nome;
    multiplosPerfis;
    perfis;
}
exports.LoginResponse = LoginResponse;
//# sourceMappingURL=login.js.map