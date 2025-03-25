import { UniqueEntityID } from './unique-entity-id';
export declare class Entity<Data> {
    private _id;
    protected props: Data;
    get id(): UniqueEntityID;
    constructor(Data: Data);
}
