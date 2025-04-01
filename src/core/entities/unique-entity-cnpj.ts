export class UniqueEntitycnpj {
    private value: string;
  
    constructor(value: string) {
      if (!this.isValidCNPJ(value)) {
        throw new Error('Invalid CNPJ provided.');
      }
      this.value =this.cleanCNPJ(value);
    }
  
    toString(): string {
      return this.value;
    }
  
    private cleanCNPJ(cnpj: string): string {
      return cnpj.replace(/\D/g, ''); // Remove caracteres não numéricos
    }
  
    private isValidCNPJ(cnpj: string): boolean {
      cnpj = this.cleanCNPJ(cnpj);
      
      if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
  
      let size = cnpj.length - 2;
      let numbers = cnpj.substring(0, size);
      let digits = cnpj.substring(size);
      let sum = 0;
      let pos = size - 7;
  
      for (let i = size; i >= 1; i--) {
        sum += Number(numbers[size - i]) * pos--;
        if (pos < 2) pos = 9;
      }
  
      let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (result !== Number(digits[0])) return false;
  
      size = size + 1;
      numbers = cnpj.substring(0, size);
      sum = 0;
      pos = size - 7;
  
      for (let i = size; i >= 1; i--) {
        sum += Number(numbers[size - i]) * pos--;
        if (pos < 2) pos = 9;
      }
  
      result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      return result === Number(digits[1]);
    }
  }
  