import { Type } from '../entities/type';
export declare abstract class TypeRepository {
    abstract create(type: Type): Promise<Type>;
    abstract findAll(): Promise<Type[]>;
    abstract findById(id: string): Promise<Type | null>;
    abstract findByName(name: string): Promise<Type | null>;
}
