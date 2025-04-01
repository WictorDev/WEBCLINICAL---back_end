import { UniqueEntityID } from './unique-entity-id';
import { UniqueEntitycpf } from './unique-entity-cpf';
export class Entity<Data> {
  private _id: UniqueEntityID;
  private _cpf: UniqueEntitycpf;
  protected props: Data;

  get id() {
    return this._id;
    return this._cpf;
  }

  constructor(Data: Data) {
    this.props = Data;
  }
}
