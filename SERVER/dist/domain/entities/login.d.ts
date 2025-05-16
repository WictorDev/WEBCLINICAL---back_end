export interface LoginProps {
    identifier: string;
    password: string;
    isPatient?: boolean;
    tipo?: 'paciente' | 'profissional';
}
export default class Login {
    identifier: string;
    password: string;
    isPatient: boolean;
    tipo?: 'paciente' | 'profissional';
    constructor(props: LoginProps);
}
