export interface LoginProps {
  identifier: string; // pode ser CPF ou email
  password: string;
  isPatient?: boolean; // flag para determinar se é login de paciente
  tipo?: 'PATIENT' | 'EMPLOYEE' | 'ADMIN';}

export class Login {
  identifier: string;
  password: string;
  isPatient?: boolean; // flag para determinar se é login de paciente
  tipo?: 'PATIENT' | 'EMPLOYEE' | 'ADMIN';

  constructor(props: LoginProps) {
    this.identifier = props.identifier;
    this.password = props.password;
    this.isPatient = props.isPatient || false;
    this.tipo = props.tipo;
  }
}

export class LoginResponse {
  token?: string;
  tipo?: 'PATIENT' | 'EMPLOYEE' | 'ADMIN';
  nome?: string;
  multiplosPerfis?: boolean;
  perfis?: string[];
}