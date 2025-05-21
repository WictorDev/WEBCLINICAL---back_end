export interface LoginProps {
    identifier: string;
    password: string;
    isPatient?: boolean;
    tipo?: 'paciente' | 'profissional' | 'admin';
}
export default class Login {
    identifier: string;
    password: string;
    isPatient: boolean;
    tipo?: 'paciente' | 'profissional' | 'admin';
    constructor(props: LoginProps);
}
