export interface LoginProps {
    identifier: string;
    password: string;
    isPatient?: boolean;
    tipo?: 'PATIENT' | 'EMPLOYEE' | 'ADMIN';
}
export declare class Login {
    identifier: string;
    password: string;
    isPatient?: boolean;
    tipo?: 'PATIENT' | 'EMPLOYEE' | 'ADMIN';
    constructor(props: LoginProps);
}
export declare class LoginResponse {
    token?: string;
    tipo?: 'PATIENT' | 'EMPLOYEE' | 'ADMIN';
    nome?: string;
    multiplosPerfis?: boolean;
    perfis?: string[];
}
