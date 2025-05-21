export class UniqueEntityCnpj {
  private readonly value: string;

  constructor(value: string) {
    const cleanCNPJ = value.replace(/\D/g, '');

    if (!this.isValidFormat(cleanCNPJ)) {
      throw new Error('Formato de CNPJ inválido. Deve conter 14 dígitos numéricos.');
    }

    if (!this.isValidCNPJ(cleanCNPJ)) {
      throw new Error('CNPJ inválido.');
    }

    this.value = cleanCNPJ; // salva SEM formatação
  }

  toString(): string {
    return this.value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }

  private isValidFormat(cnpj: string): boolean {
    return /^\d{14}$/.test(cnpj);
  }

  private isValidCNPJ(cnpj: string): boolean {
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    const calcCheckDigit = (cnpj: string, length: number): number => {
      const weights = length === 12
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

      const sum = cnpj
        .slice(0, length)
        .split('')
        .reduce((acc, digit, index) => acc + parseInt(digit) * weights[index], 0);

      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const digit1 = calcCheckDigit(cnpj, 12);
    const digit2 = calcCheckDigit(cnpj, 13);

    return digit1 === parseInt(cnpj[12]) && digit2 === parseInt(cnpj[13]);
  }
}
export default UniqueEntityCnpj;
