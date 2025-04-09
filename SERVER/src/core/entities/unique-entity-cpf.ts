export class UniqueEntityCpf {
  private readonly value: string;

  constructor(value: string) {
    if (!this.isValidFormat(value)) {
      throw new Error('Formato de CPF inválido. Use 000.000.000-00');
    }

    if (!this.isValidCPF(value)) {
      throw new Error('CPF inválido.');
    }

    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  // Apenas valida o formato 000.000.000-00
  private isValidFormat(cpf: string): boolean {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf);
  }

  // Validação completa dos dígitos verificadores
  private isValidCPF(cpf: string): boolean {
    const cleanCPF = cpf.replace(/\D/g, '');

    if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) return false;

    let sum = 0, rest;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF[i - 1]) * (11 - i);
    }

    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cleanCPF[9])) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF[i - 1]) * (12 - i);
    }

    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;

    return rest === parseInt(cleanCPF[10]);
  }
}
export default UniqueEntityCpf;