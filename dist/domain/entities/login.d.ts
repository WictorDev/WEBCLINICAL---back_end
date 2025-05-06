export interface LoginProps {
    identifier: string;
    password: string;
    isPatient?: boolean;
}
export default class Login {
    identifier: string;
    password: string;
    isPatient: boolean;
    constructor(props: LoginProps);
}
