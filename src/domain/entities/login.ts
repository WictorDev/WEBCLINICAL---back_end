export interface LoginProps {
  identifier: string; // pode ser CPF ou email
  password: string;
  isPatient?: boolean; // flag para determinar se é login de paciente
  tipo?: 'paciente' | 'profissional' | 'admin';}

export default class Login {
  identifier: string;
  password: string;
  isPatient: boolean;
  tipo?: 'paciente' | 'profissional' | 'admin';

  constructor(props: LoginProps) {
    this.identifier = props.identifier;
    this.password = props.password;
    this.isPatient = props.isPatient || false;
    this.tipo = props.tipo;
  }
}