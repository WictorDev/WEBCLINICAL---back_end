export interface TypeData {
    id: string;
    name: string;
}
export declare class Type {
    private data;
    constructor(data: TypeData);
    get id(): string;
    get name(): string;
    set name(name: string);
}
