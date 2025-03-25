import { UniqueEntityID } from './unique-entity-id';
export class Entity<Data> {
  private _id: UniqueEntityID;
  protected props: Data;

  get id() {
    return this._id;
  }

  constructor(Data: Data) {
    this.props = Data;
  }
}
