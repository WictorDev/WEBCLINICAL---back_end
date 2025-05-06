"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    data;
    constructor(data) {
        this.data = data;
    }
    get cpf() {
        return this.data.cpf;
    }
    get name() {
        return this.data.name;
    }
    set name(name) {
        if (!name)
            throw new Error('Nome é obrigatório.');
        this.data.name = name;
    }
    get advice() {
        return this.data.advice;
    }
    set advice(advice) {
        this.data.advice = advice;
    }
    get typeId() {
        return this.data.typeId;
    }
    set typeId(typeId) {
        if (!typeId)
            throw new Error('typeId é obrigatório.');
        this.data.typeId = typeId;
    }
    get employeeTypeId() {
        return this.data.employeeTypeId;
    }
    set employeeTypeId(employeeTypeId) {
        if (!employeeTypeId)
            throw new Error('employeeTypeId é obrigatório.');
        this.data.employeeTypeId = employeeTypeId;
    }
}
exports.Employee = Employee;
//# sourceMappingURL=employee.js.map