export class PhoneFormatter {
  /**
   * Formata um número de telefone brasileiro no padrão (XX) XXXXX-XXXX
   * @param phoneNumber - Número de telefone (apenas dígitos)
   * @returns Número formatado
   */
  static format(phoneNumber: string): string {
    // Remove todos os caracteres não numéricos
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Valida se tem 10 ou 11 dígitos (com DDD)
    if (cleanNumber.length < 10 || cleanNumber.length > 11) {
      throw new Error("Telefone deve ter 10 ou 11 dígitos (incluindo DDD).");
    }
    
    // Formata o número no padrão brasileiro
    if (cleanNumber.length === 11) {
      // Celular: (XX) XXXXX-XXXX
      return `(${cleanNumber.slice(0, 2)}) ${cleanNumber.slice(2, 7)}-${cleanNumber.slice(7)}`;
    } else {
      // Telefone fixo: (XX) XXXX-XXXX
      return `(${cleanNumber.slice(0, 2)}) ${cleanNumber.slice(2, 6)}-${cleanNumber.slice(6)}`;
    }
  }

  /**
   * Remove a formatação de um número de telefone
   * @param formattedPhone - Número formatado
   * @returns Apenas os dígitos
   */
  static unformat(formattedPhone: string): string {
    return formattedPhone.replace(/\D/g, '');
  }

  /**
   * Valida se um número de telefone está no formato correto
   * @param phoneNumber - Número de telefone
   * @returns true se válido, false caso contrário
   */
  static isValid(phoneNumber: string): boolean {
    try {
      const cleanNumber = phoneNumber.replace(/\D/g, '');
      return cleanNumber.length >= 10 && cleanNumber.length <= 11;
    } catch {
      return false;
    }
  }
} 