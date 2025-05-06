export interface LoginProps {
  identifier: string; // pode ser CPF ou email
  password: string;
  isPatient?: boolean; // flag para determinar se é login de paciente
}

export default class Login {
  identifier: string;
  password: string;
  isPatient: boolean;

  constructor(props: LoginProps) {
    this.identifier = props.identifier;
    this.password = props.password;
    this.isPatient = props.isPatient || false;
  }
}