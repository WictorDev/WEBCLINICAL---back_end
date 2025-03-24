import { randomUUID } from 'node:crypto';

export class UniqueEntityID {
  private value: string;

  toString(): string {
    return this.value;
  }
  constructor(value?: string) {
    // Se o valor não for fornecido, gera um UUID
    this.value = value ?? randomUUID();
  }
}
