import { Entity } from "../Entity";
import { ValueObject } from "../ValueObject";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
    insert(entity:E) : Promise<void>
    bulkInsert(entity: E[]): Promise<void>
    update(entity: E): Promise<void>
    bulkUpdate(entity: E[]): Promise<void>
    findAll(): Promise<void>
    findById(entity_id: EntityId): Promise<E>
    findByIds(entity_ids: EntityId[]): Promise<E[]>
}