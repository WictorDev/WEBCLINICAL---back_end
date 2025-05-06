export interface TypeData {
  id: string;
  name: string;
}

export class Type {
  constructor(private data: TypeData) {}

  get id(): string {
    return this.data.id;
  }

  get name(): string {
    return this.data.name;
  }

  set name(name: string) {
    if (!name) throw new Error("Nome do tipo é obrigatório.");
    this.data.name = name;
  }
} 